#! /usr/bin/env python3
"""
This Node takes person detection data from the zed, converts it to the world frame and calculates the orientation of the person from the skeleton data
"""

import rospy
import tf
import tf2_ros
import tf2_geometry_msgs
import sys
import numpy as np
from nav_msgs.msg import PathMessage

class LaserPathController:

    MAX_DISTANCE = 1

    def __init__(self) -> None:
        topic = '/zed/zed_node/obj_det/objects'
        self.sub = rospy.Subscriber(topic, PathMessage, self.receive_path)

    def receive_path(self, path):

        points = [(pose.pose.position.x, pose.pose.position.y) for pose in path.poses]
        points = [ point for point in points if (
            ((np.pow(point[0],2)+np.pow(point[1],2) )< np.pow(self.MAX_DISTANCE,2))
        )]
