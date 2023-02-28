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
<<<<<<<< HEAD:emotion_detection/scripts/cam_pub.py
    try:
        rospy.loginfo('Publishing')
        _, frame = cap.read()
        pub.publish(bridge.cv2_to_imgmsg(frame))
    except:
        ...
========
    rospy.loginfo('Publishing')
    frame = cv2.imread(img_path)
    #model
    pub.publish(bridge.cv2_to_imgmsg(frame))
>>>>>>>> 1ba70e845c55185b5c6f88001cdb53b34e9ce5ab:user_interface/scripts/get_face.py
    rr.sleep()
