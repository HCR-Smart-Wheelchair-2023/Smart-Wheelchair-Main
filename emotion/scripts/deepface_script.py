#! /usr/bin/env python3

import rospy
import cv2

from sensor_msgs.msg import Image
from cv_bridge import CvBridge
from std_msgs.msg import String
from geometry_msgs.msg import Twist

from deepface import DeepFace



class FER():
    def __init__(self):
        rospy.init_node('FER')
        #instantiate subscriber
        self.pub = rospy.Publisher('chatter', String, queue_size=10)
        self.image_sub = rospy.Subscriber('/camera/color/image_raw', Image, self.img_cb)
        #get image, preprecess and run model
        self.bridge = CvBridge()
        #create new ros topic and send emotion matrix
        self.emotion = 'neutral'

        self.cmdvel_sub = rospy.Subscriber('/cmd_vel', Twist, self.cmdvel_cb)
        self.pub_adj = rospy.Publisher('cmd_vel_adj', Twist, queue_size = 10)
        self.scaling_factor = 1


    def img_cb(self,data):
        #rospy.loginfo('Recieved image')
        # ros img to opencv
        cv_image = self.bridge.imgmsg_to_cv2(data)
        cv2.imwrite('/root/ros_ws/src/emotion/scripts/image/img1.jpg', cv_image)

        objs = DeepFace.analyze(img_path = "/root/ros_ws/src/emotion/scripts/image/img1.jpg", actions = ['emotion'])
        self.emotion = objs[0]['dominant_emotion']

        self.pub.publish(self.emotion)

    def cmdvel_cb(self,data):

        if self.emotion == 'neutral':
            self.scaling_factor = 1
        elif self.emotion == 'fear':
            self.scaling_factor = 0.5
        elif self.emotion == 'happy':
            self.scaling_factor = 1.5

        adj_data = data
        print(adj_data.linear)
        adj_data.linear.x = adj_data.linear.x * self.scaling_factor
        self.pub_adj.publish(adj_data)



fer = FER()
rospy.spin()
