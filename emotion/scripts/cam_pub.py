#! /usr/bin/env python3

import rospy
from sensor_msgs.msg import Image
from cv_bridge import CvBridge

import cv2
import os

rospy.init_node('Cam')
pub = rospy.Publisher("CamFrames", Image, queue_size = 10)

cap = cv2.VideoCapture('/dev/video0')

if not (cap.isOpened()):
    print("Could not open video device")

rr = rospy.Rate(1)
bridge = CvBridge()
while not rospy.is_shutdown():
    rospy.loginfo('Publishing')
    _, frame = cap.read()
    pub.publish(bridge.cv2_to_imgmsg(frame))
    rr.sleep()
