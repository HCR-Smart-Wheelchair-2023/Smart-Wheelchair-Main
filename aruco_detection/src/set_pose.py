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


class poseSetter:
    def __init__(self):
        self.set_pose_service = rospy.ServiceProxy("/zed/zed_node/set_pose", set_pose)

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


if __name__ == "__main__":
    rospy.init_node("aruco_camera_controller")
    posesetter = poseSetter()
    # set camera position
    camera_position = [0.38, 3, 1.45]

    # set camera angle
    angle_x = 0 * math.pi / 180
    angle_y = 0 * math.pi / 180
    angle_z = 90 * math.pi / 180

    camera_angle = [angle_x, angle_y, angle_z]

    posesetter.set_zedPose(
        camera_position[0],
        camera_position[1],
        camera_position[2],
        camera_angle[0],
        camera_angle[1],
        camera_angle[2],
    )
    rospy.spin()
