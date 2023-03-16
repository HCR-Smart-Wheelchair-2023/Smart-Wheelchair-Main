#!/usr/bin/env python3

import rospy
from geometry_msgs.msg import PoseStamped, TransformStamped, Pose
from std_msgs.msg import String
from aruco_msgs.msg import MarkerArray, Marker
from zed_interfaces.srv import set_pose, set_poseRequest
import tf
import numpy as np
import math


Set_Pose = set_pose()


class ArUcoCameraController:
    def __init__(self):
        self.aruco_markerArray_sub = rospy.Subscriber(
            "/aruco_marker_publisher/markers",
            MarkerArray,
            self.aruco_markerArray_callback,
        )

        self.set_pose_service = rospy.ServiceProxy("/zed/zed_node/set_pose", set_pose)

        self.pub = rospy.Publisher("/my_marker/pose", PoseStamped, queue_size=10)

        # angle is in radians
        angle = math.pi / 2
        quaternion = tf.transformations.quaternion_from_euler(0, 0, angle)

        # create a TransformStamped message for the marker
        self.marker_transform = TransformStamped()
        self.marker_transform.header.frame_id = "/camera_link"
        self.marker_transform.child_frame_id = "/aruco_marker"
        self.marker_transform.transform.translation.x = 0.87
        self.marker_transform.transform.translation.y = 7.74
        self.marker_transform.transform.translation.z = 1.42
        self.marker_transform.transform.rotation.x = quaternion[0]
        self.marker_transform.transform.rotation.y = quaternion[1]
        self.marker_transform.transform.rotation.z = quaternion[2]
        self.marker_transform.transform.rotation.w = quaternion[3]

        # initialize buffer for moving average filter
        self.buffer = []
        self.buffer_size = 10

        # # publish the marker pose
        # self.pub.publish(self.marker_pose)

    def set_zedPose(self, x, y, z, R, P, Y):
        print("waiting for set pose service")
        rospy.wait_for_service("/zed/zed_node/set_pose")
        print("found the set_pose service!")

        # publish the marker pose
        # self.pub.publish(self.marker_pose)

        try:
            setpose = rospy.ServiceProxy("/zed/zed_node/set_pose", Set_Pose)
            resp = setpose(x, y, z, R, P, Y)
            print("response of the service is: ", resp)

            return resp
        except rospy.ServiceException as e:
            print("service not working yet")

    def aruco_markerArray_callback(self, markerArray):
        # print("markerArray: ", markerArray)
        print("markerArray id of first marker: ", markerArray.markers[0].id)

        aruco_pose = markerArray.markers[0].pose.pose

        aruco_position = markerArray.markers[0].pose.pose.position

        aruco_position.x, aruco_position.y, aruco_position.z = (
            aruco_position.z,
            aruco_position.x,
            aruco_position.y,
        )
        print(f"aruco position: {aruco_position}")

        # moving average filter
        # self.buffer.append(aruco_pose)
        # if len(self.buffer) > self.buffer_size:
        #     self.buffer.pop(0)

        #     if len(self.buffer) == self.buffer_size:
        #         average_pose = self.calculate_average_pose()
        #         if self.is_pose_noise(aruco_pose, average_pose, 0.3):
        #             rospy.loginfo("Pose is too far from average, discarding...")
        #             return
        #         else:
        #             aruco_position.x = average_pose.position.x
        #             aruco_position.y = average_pose.position.z
        #             aruco_position.z = average_pose.position.y

        aruco_orientation = markerArray.markers[0].pose.pose.orientation
        aruco_orientation_euler = tf.transformations.euler_from_quaternion(
            [
                aruco_orientation.x,
                aruco_orientation.y,
                aruco_orientation.z,
                aruco_orientation.w,
            ]
        )

        # swap angles
        aruco_orientation_euler = list(aruco_orientation_euler)
        aruco_orientation_euler[0], aruco_orientation_euler[1], aruco_orientation_euler[2] = aruco_orientation_euler[0], aruco_orientation_euler[1], aruco_orientation_euler[2]

        aruco_orientation = tf.transformations.quaternion_from_euler(
            aruco_orientation_euler[0],
            aruco_orientation_euler[1],
            aruco_orientation_euler[2],
        )

        aruco_orientation_euler_degrees = [
            aruco_orientation_euler[0] * 180 / math.pi,
            aruco_orientation_euler[1] * 180 / math.pi,
            aruco_orientation_euler[2] * 180 / math.pi,
        ]

        print(f"aruco orientation: {aruco_orientation_euler_degrees}")

        transform_camera_aruco = tf.transformations.concatenate_matrices(
            tf.transformations.translation_matrix(
                [aruco_position.x, aruco_position.y, aruco_position.z]
            ),
            tf.transformations.quaternion_matrix(
                [
                    aruco_orientation[0],
                    aruco_orientation[1],
                    aruco_orientation[2],
                    aruco_orientation[3],
                ]
            ),
        )
        # print(f"transform_camera_aruco: {transform_camera_aruco}")
        transform_aruco_camera = tf.transformations.inverse_matrix(
            transform_camera_aruco
        )

        transfrom_world_aruco = tf.transformations.concatenate_matrices(
            tf.transformations.translation_matrix(
                [
                    self.marker_transform.transform.translation.x,
                    self.marker_transform.transform.translation.y,
                    self.marker_transform.transform.translation.z,
                ]
            ),
            tf.transformations.quaternion_matrix(
                [
                    self.marker_transform.transform.rotation.x,
                    self.marker_transform.transform.rotation.y,
                    self.marker_transform.transform.rotation.z,
                    self.marker_transform.transform.rotation.w,
                ]
            ),
        )
        # print(f"transfrom_world_aruco: {transfrom_world_aruco}")

        transform_world_camera = tf.transformations.concatenate_matrices(
            transfrom_world_aruco, transform_aruco_camera
        )

        camera_position = tf.transformations.translation_from_matrix(
            transform_world_camera
        )

        camera_orientation = tf.transformations.euler_from_matrix(
            transform_world_camera
        )

        print(
            f"camera position: {camera_position[0] , camera_position[1], camera_position[2]}"
        )
        print(
            f"camera orientation: {camera_orientation[0], camera_orientation[1], camera_orientation[2]}"
        )

        self.set_zedPose(
            camera_position[0],
            camera_position[1],
            camera_position[2],
            camera_orientation[0],
            camera_orientation[1],
            camera_orientation[2],
        )

    def calculate_average_pose(self):
        x_sum = 0.0
        y_sum = 0.0
        z_sum = 0.0
        for pose in self.buffer:
            x_sum += pose.position.x
            y_sum += pose.position.y
            z_sum += pose.position.z
        average_pose = Pose()
        average_pose.position.x = x_sum / self.buffer_size
        average_pose.position.y = y_sum / self.buffer_size
        average_pose.position.z = z_sum / self.buffer_size
        return average_pose

    def is_pose_noise(self, current_pose, average_pose, threshold=0.1):
        if abs(current_pose.position.x - average_pose.position.x) > threshold:
            return True
        if abs(current_pose.position.y - average_pose.position.y) > threshold:
            return True
        if abs(current_pose.position.z - average_pose.position.z) > threshold:
            return True
        return False


if __name__ == "__main__":
    rospy.init_node("aruco_camera_controller")
    aruco_camera_controller = ArUcoCameraController()
    rospy.spin()
