#! /usr/bin/env python3

import rospy
from sensor_msgs.msg import Image
from cv_bridge import CvBridge

import cv2
import os

rospy.init_node('Cam')
pub = rospy.Publisher("CamFrames", Image, queue_size = 10)
img_path = ''

#----detect and publish sentiment to rostopic---- 

rr = rospy.Rate(3)
bridge = CvBridge()
while not rospy.is_shutdown():
    try:
        rospy.loginfo('Publishing')
        _, frame = cap.read()
        pub.publish(bridge.cv2_to_imgmsg(frame))
    except:
        ...
    rospy.loginfo('Publishing')
    frame = cv2.imread(img_path)
    #model
    pub.publish(bridge.cv2_to_imgmsg(frame))
    rr.sleep()
