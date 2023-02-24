#! /usr/bin/env python3
"""
This Node takes the data from the /pose topic and sets the frames such that map-base_link are correct
"""

import rospy
import tf
import tf2_ros
import sys
import numpy as np
from nav_msgs.msg import Odometry
from geometry_msgs.msg import PoseStamped
from time import sleep
import time


class PoseController:

    def __init__(self) -> None:
        # the current pose with offset
        self.pose = np.array((0,0,0,0,0,0,0))
        self.received_message = False
        # add the start pose
        self.pose_offset = np.array((0,0,0,0,0,0,0))
        self.timer = rospy.Timer(rospy.Duration(0.2), self.publish_frames)
        self.sub = rospy.Subscriber('/zed/zed_node/pose', PoseStamped, self.pose_callback)

        self.tf_buffer = tf2_ros.Buffer()
        self.tf_listener = tf2_ros.TransformListener(self.tf_buffer)

    def pose_callback(self, msg : PoseStamped):
        self.pose = np.array((msg.pose.position.x, msg.pose.pose.position.y, msg.pose.pose.position.z,
            msg.pose.pose.orientation.x, msg.pose.pose.orientation.y, msg.pose.pose.orientation.z, msg.pose.pose.orientation.w))
        self.received_message = True

    def publish_frames(self):
        br = tf.TransformBroadcaster()
        if not self.received_message:
            br.sendTransform((0,0,0),
                        (0,0,0,0),
                        rospy.Time.now(),
                        "odom",
                        "map")
            return

        # publish the current pose and offset
        transform = np.array((0,0,0,0,0,0,0))
        transform = np.add(transform, self.pose)
        transform = np.add(transform, self.pose_offset)

        # find the transform from map to base_link
        try:
            current_trans = self.tf_buffer.lookup_transform('odom', 'base_link', rospy.Time())
            current_trans = np.array((
                current_trans.translation.x,
                current_trans.translation.y,
                current_trans.translation.z,
                current_trans.rotation.x,
                current_trans.rotation.y,
                current_trans.rotation.z,
                current_trans.rotation.w,
            ))
        except Exception:
            br.sendTransform((0,0,0),
                        (0,0,0,0),
                        rospy.Time.now(),
                        "odom",
                        "map")
            return
        transform = np.subtract(current_trans, transform)

        # send the transform between map and odom
        br.sendTransform(transform[:3],
                        transform[3:],
                        rospy.Time.now(),
                        "odom",
                        "map")



if __name__ == '__main__':
    rospy.init_node('pose_controller')
    controller = PoseController()
    rospy.spin()
