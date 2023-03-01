#!/usr/bin/env python

import rospy
from geometry_msgs.msg import PoseStamped

from zed_interfaces.srv import set_pose, set_poseRequest


class ArUcoCameraController:
    def __init__(self):
        self.aruco_pose_sub = rospy.Subscriber(
            "/aruco_single/pose", PoseStamped, self.aruco_pose_callback
        )
        self.set_pose_service = rospy.ServiceProxy("/zed/zed_node/set_pose", set_pose)

    def aruco_pose_callback(self, pose_stamped):
        # Extract the position and orientation of the ArUco marker
        aruco_position = pose_stamped.pose.position
        aruco_orientation = pose_stamped.pose.orientation

        # Use the ArUco marker's position and orientation to update the camera pose
        set_pose_request = set_poseRequest()
        set_pose_request.pose.position = aruco_position
        set_pose_request.pose.orientation = aruco_orientation
        self.set_pose_service(set_pose_request)


if __name__ == "__main__":
    rospy.init_node("aruco_camera_controller")
    aruco_camera_controller = ArUcoCameraController()
    rospy.spin()
