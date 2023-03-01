#!/usr/bin/env python

import rospy
from geometry_msgs.msg import PoseStamped

from zed_interfaces.srv import set_pose, set_poseRequest


Set_Pose = set_pose()


def set_zedPose(x, y, z, R, P, Y):
    print("waiting for set pose service")
    rospy.wait_for_service("/zed/zed_node/set_pose")
    print("found the set_pose service!")
    try:
        setpose = rospy.ServiceProxy("/zed/zed_node/set_pose", Set_Pose)
        resp = setpose(x, y, z, R, P, Y)
        print("response of the service is: ", resp)
        return resp
    except rospy.ServiceException as e:
        print("service not working yet")


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
        set_zedPose(
            aruco_position.x,
            aruco_position.y,
            aruco_position.z,
            aruco_orientation.x,
            aruco_orientation.y,
            aruco_orientation.z,
        )


if __name__ == "__main__":
    rospy.init_node("aruco_camera_controller")
    aruco_camera_controller = ArUcoCameraController()
    rospy.spin()
