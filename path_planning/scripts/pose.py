#!/usr/bin/env python

import rospy
from geometry_msgs.msg import PoseStamped
from std_srvs.srv import SetBool, SetBoolRequest


class ArUcoCameraController:
    def __init__(self):
        self.aruco_pose_sub = rospy.Subscriber(
            "/aruco_single/pose", PoseStamped, self.aruco_pose_callback
        )
        self.set_pose_service = rospy.ServiceProxy("/set_pose", SetBool)

    def aruco_pose_callback(self, pose_stamped):
        # Extract the position and orientation of the ArUco marker
        aruco_position = pose_stamped.pose.position
        aruco_orientation = pose_stamped.pose.orientation

        # Use the ArUco marker's position and orientation to update the camera pose
        success = self.set_pose_service(
            aruco_position.x,
            aruco_position.y,
            aruco_position.z,
            aruco_orientation.x,
            aruco_orientation.y,
            aruco_orientation.z,
        )

        if success:
            rospy.loginfo("Camera pose updated")
        else:
            rospy.logerr("Failed to update camera pose")


if __name__ == "__main__":
    rospy.init_node("aruco_camera_controller")
    aruco_camera_controller = ArUcoCameraController()
    rospy.spin()
