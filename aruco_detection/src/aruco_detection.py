#!/usr/bin/env python3

import rospy
from geometry_msgs.msg import PoseStamped, TransformStamped
from std_msgs.msg import String
from aruco_ros.msg import MarkerArray, Marker
from zed_interfaces.srv import set_pose, set_poseRequest
import tf
import numpy as np
import math


Set_Pose = set_pose()


class ArUcoCameraController:
    def __init__(self):
        # self.aruco_pose_sub = rospy.Subscriber(
        #     "/aruco_single/pose", PoseStamped, self.aruco_pose_callback
        # )

        # self.aruco_transform_sub = rospy.Subscriber(
        #     "/aruco_single/transform", TransformStamped, self.aruco_transform_callback
        # )

        print("IN ARUCOCAMERACONTROLLER")

        self.aruco_markerArray_sub = rospy.Subscriber(
            "/aruco_marker_publisher/markers",
            MarkerArray,
            self.aruco_markerArray_callback,
        )

        self.set_pose_service = rospy.ServiceProxy("/zed/zed_node/set_pose", set_pose)

        self.pub = rospy.Publisher("/my_marker/pose", PoseStamped, queue_size=10)

        # angle is in radians
        angle = math.pi / 2 + math.pi
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

        # create a PoseStamped message for the marker
        self.marker_pose = PoseStamped()
        self.marker_pose.header.frame_id = "/camera_link"
        self.marker_pose.pose.position.x = 0.87
        self.marker_pose.pose.position.y = 7.74
        self.marker_pose.pose.position.z = 1.42
        self.marker_pose.pose.orientation.x = 0.0
        self.marker_pose.pose.orientation.y = 0.0
        self.marker_pose.pose.orientation.z = 0.0
        self.marker_pose.pose.orientation.w = 1.0

        # publish the marker pose
        self.pub.publish(self.marker_pose)

    def set_zedPose(self, x, y, z, R, P, Y):
        print("waiting for set pose service")
        rospy.wait_for_service("/zed/zed_node/set_pose")
        print("found the set_pose service!")

        # publish the marker pose
        self.pub.publish(self.marker_pose)

        try:
            setpose = rospy.ServiceProxy("/zed/zed_node/set_pose", Set_Pose)
            resp = setpose(x, y, z, R, P, Y)
            print("response of the service is: ", resp)

            return resp
        except rospy.ServiceException as e:
            print("service not working yet")

    # def aruco_transform_callback(self, transform_stamped):
    #     # Extract the position and orientation of the ArUco marker

    #     aruco_position = transform_stamped.transform.translation
    #     print(f"aruco position: {aruco_position}")
    #     aruco_orientation = transform_stamped.transform.rotation
    #     print(f"aruco orientation: {aruco_orientation}")

    #     transform_camera_aruco = tf.transformations.concatenate_matrices(
    #         tf.transformations.translation_matrix(
    #             [aruco_position.x, aruco_position.y, aruco_position.z]
    #         ),
    #         tf.transformations.quaternion_matrix(
    #             [
    #                 aruco_orientation.x,
    #                 aruco_orientation.y,
    #                 aruco_orientation.z,
    #                 aruco_orientation.w,
    #             ]
    #         ),
    #     )
    #     print(f"transform_camera_aruco: {transform_camera_aruco}")
    #     transform_aruco_camera = tf.transformations.inverse_matrix(
    #         transform_camera_aruco
    #     )

    #     transfrom_world_aruco = tf.transformations.concatenate_matrices(
    #         tf.transformations.translation_matrix(
    #             [
    #                 self.marker_transform.transform.translation.x,
    #                 self.marker_transform.transform.translation.y,
    #                 self.marker_transform.transform.translation.z,
    #             ]
    #         ),
    #         tf.transformations.quaternion_matrix(
    #             [
    #                 self.marker_transform.transform.rotation.x,
    #                 self.marker_transform.transform.rotation.y,
    #                 self.marker_transform.transform.rotation.z,
    #                 self.marker_transform.transform.rotation.w,
    #             ]
    #         ),
    #     )
    #     print(f"transfrom_world_aruco: {transfrom_world_aruco}")

    #     transform_world_camera = tf.transformations.concatenate_matrices(
    #         transfrom_world_aruco, transform_aruco_camera
    #     )

    #     camera_position = tf.transformations.translation_from_matrix(
    #         transform_world_camera
    #     )

    #     camera_orientation = tf.transformations.euler_from_matrix(
    #         transform_world_camera
    #     )

    #     print(
    #         f"camera position: {camera_position[0], camera_position[1], camera_position[2]}"
    #     )
    #     print(
    #         f"camera orientation: {camera_orientation[0], camera_orientation[1], camera_orientation[2]}"
    #     )

    #     self.set_zedPose(
    #         camera_position[0],
    #         camera_position[1],
    #         camera_position[2],
    #         camera_orientation[0],
    #         camera_orientation[1],
    #         camera_orientation[2],
    #     )

    def aruco_markerArray_callback(self, markerArray):
        rospy.loginfo("aruco_markerArray_callback")
        print("markerArray: ", markerArray)
        print("markerArray id of first marker: ", markerArray.markers[0].id)

        aruco_position = markerArray.markers[0].pose.position
        print(f"aruco position: {aruco_position}")
        aruco_orientation = markerArray.markers[0].pose.orientation
        print(f"aruco orientation: {aruco_orientation}")

        transform_camera_aruco = tf.transformations.concatenate_matrices(
            tf.transformations.translation_matrix(
                [aruco_position.x, aruco_position.y, aruco_position.z]
            ),
            tf.transformations.quaternion_matrix(
                [
                    aruco_orientation.x,
                    aruco_orientation.y,
                    aruco_orientation.z,
                    aruco_orientation.w,
                ]
            ),
        )
        print(f"transform_camera_aruco: {transform_camera_aruco}")
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
        print(f"transfrom_world_aruco: {transfrom_world_aruco}")

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
            f"camera position: {camera_position[0], camera_position[1], camera_position[2]}"
        )
        print(
            f"camera orientation: {camera_orientation[0], camera_orientation[1], camera_orientation[2]}"
        )

        # self.set_zedPose(
        #     camera_position[0],
        #     camera_position[1],
        #     camera_position[2],
        #     camera_orientation[0],
        #     camera_orientation[1],
        #     camera_orientation[2],
        # )


if __name__ == "__main__":
    rospy.init_node("aruco_camera_controller")
    aruco_camera_controller = ArUcoCameraController()
    rospy.spin()
