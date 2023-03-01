#! /usr/bin/env python3

import rospy

from sensor_msgs.msg import Image
from cv_bridge import CvBridge
from std_msgs.msg import String
from geometry_msgs.msg import Twist

from deepface import DeepFace
import cv2


class FER():
    def __init__(self):
        rospy.init_node('FER')
        #instantiate subscriber and publisher 
        self.pub = rospy.Publisher('sentiment', String, queue_size=10)
        self.bridge = CvBridge()
        # initialize emotion as neutral
        self.emotion = 'neutral'
        # again ideally this would be it own node  
        self.cmdvel_sub = rospy.Subscriber('/cmd_vel', Twist, self.cmdvel_cb)
        self.pub_adj = rospy.Publisher('cmd_vel_adj', Twist, queue_size = 10)
        self.scaling_factor = 1
    
    # ideally this would be its own node, figuring out how to adjust the motion based on not only emotion
    def cmdvel_cb(self,data):
        
        # adjust the incoming linear velocity by simple scaling factor 
        # use most recent emotion recorded
        if self.emotion == 'neutral':
            self.scaling_factor = 1
        elif self.emotion == 'fear':
            self.scaling_factor = 0.5
        elif self.emotion == 'happy':
            self.scaling_factor = 1.5

        adj_data = data.data
        adj_data.linear.x = adj_data.linear.x * self.scaling_factor

        self.pub.publish(adj_data)
    
    def start(self, _img_path):
        rr = rospy.Rate(3)
        while not rospy.is_shutdown():
            objs = DeepFace.analyze(img_path = _img_path , actions = ['emotion'])
            self.emotion = objs[0]['dominant_emotion']
            self.pub.publish(self.emotion)
            rr.sleep()



img_path = '../../user_interface/face.png'
fer = FER()
fer.start()
