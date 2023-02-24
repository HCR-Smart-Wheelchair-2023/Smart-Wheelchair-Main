#! /usr/bin/env python3
"""
This Node takes the data from the /odom topic and publishes the odom to base_link frame
"""

import rospy
import tf
import sys
import numpy as np
from nav_msgs.msg import Odometry
from time import sleep
import time


last_time = 0
def odom_callback(msg):
    global pub
    global sim
    global last_time
    if time.time() - last_time < 0.1:
        return
    last_time = time.time()
    br = tf.TransformBroadcaster()
    br.sendTransform((msg.pose.pose.position.x, msg.pose.pose.position.y, msg.pose.pose.position.z),
                     (msg.pose.pose.orientation.x, msg.pose.pose.orientation.y, msg.pose.pose.orientation.z, msg.pose.pose.orientation.w),
                     rospy.Time.now(),
                     "base_link",
                     "odom")
    # if not sim:
    #     msg.header.frame_id = 'odom'
    #     pub.publish(msg)



if __name__ == '__main__':
    rospy.init_node('odom_to_base_link_transform')
    sim = rospy.get_param("mode") == 'sim'
    # TODO change topic based on value of sim
    topic = '/odom' if sim else '/zed2i/zed_node/odom'
    # topic = '/odom'
    rospy.Subscriber(topic, Odometry, odom_callback)
    pub = rospy.Publisher('/odom', Odometry, queue_size=10)
    rospy.spin()
