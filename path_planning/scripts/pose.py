#!/usr/bin/env python

import rospy
from geometry_msgs.msg import PoseStamped, TransformStamped
from std_msgs.msg import String

from zed_interfaces.srv import set_pose, set_poseRequest
import tf
import numpy as np


Set_Pose = set_pose()


class ArUcoCameraController:
    def __init__(self):
        self.aruco_pose_sub = rospy.Subscriber(
            "/aruco_single/pose", PoseStamped, self.aruco_pose_callback
        )
        self.set_pose_service = rospy.ServiceProxy("/zed/zed_node/set_pose", set_pose)

        self.pub = rospy.Publisher("/position_known", String, queue_size=10)

        # set the postion of the marker in the world frame as origin
        self.marker_position = np.array([0, 0, 0])
        self.marker_orientation = np.array([0, 0, 0, 1])

    def aruco_pose_callback(self, pose_stamped):
        # Extract the position and orientation of the ArUco marker
        aruco_position = pose_stamped.pose.position
        print(f"aruco position: {aruco_position}")
        aruco_orientation = pose_stamped.pose.orientation
        print(f"aruco orientation: {aruco_orientation}")

        # Compute the rotation matrix from the quaternion
        R = tf.transformations.quaternion_matrix(
            [
                aruco_orientation.x,
                aruco_orientation.y,
                aruco_orientation.z,
                aruco_orientation.w,
            ]
        )

        print(f"rotation matrix: {R}")
        # Compute the inverse of the rotation matrix
        R = tf.transformations.inverse_matrix(R)

        # Compute the translation matrix
        T = tf.transformations.translation_matrix(
            [aruco_position.x, aruco_position.y, aruco_position.z]
        )
        print(f"translation matrix: {T}")

        # Compute the inverse of the translation matrix
        T = tf.transformations.inverse_matrix(T)

        # Apply the inverse of the translation matrix to the marker position
        camera_position = tf.translation_from_matrix(np.matmul(T, self.marker_position))
        print(f"camera position: {camera_position}")

        # Apply the inverse of the rotation matrix to the marker orientation
        camera_orientation = tf.transformations.euler_from_matrix(
            np.matmul(T, self.marker_orientation)
        )
        print(f"camera orientation: {camera_orientation}")

        # Use the ArUco marker's position and orientation to update the camera pose
        self.set_zedPose(
            camera_position.x,
            camera_position.y,
            camera_position.z,
            camera_orientation.x,
            camera_orientation.y,
            camera_orientation.z,
        )

    def set_zedPose(self, x, y, z, R, P, Y):
        print("waiting for set pose service")
        rospy.wait_for_service("/zed/zed_node/set_pose")
        print("found the set_pose service!")

        try:
            setpose = rospy.ServiceProxy("/zed/zed_node/set_pose", Set_Pose)
            resp = setpose(x, y, z, R, P, Y)
            print("response of the service is: ", resp)
            self.pub.publish("position_known")

            return resp
        except rospy.ServiceException as e:
            print("service not working yet")


if __name__ == "__main__":
    rospy.init_node("aruco_camera_controller")
    aruco_camera_controller = ArUcoCameraController()
    rospy.spin()
