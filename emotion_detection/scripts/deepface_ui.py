#! /usr/bin/env python3

import rospy

from sensor_msgs.msg import Image
from cv_bridge import CvBridge
from std_msgs.msg import String
from geometry_msgs.msg import Twist
import dynamic_reconfigure.client

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
        self.emotion_prev = 'neutral'
        # again ideally this would be it own node
        self.cmdvel_sub = rospy.Subscriber('/cmd_vel', Twist, self.cmdvel_cb)
        self.pub_adj = rospy.Publisher('cmd_vel_adj', Twist, queue_size = 10)
        self.scaling_factor = 1
        # dynamic parameter reconfiguration
        # self.client = dynamic_reconfigure.client.Client('/move_base/TrajectoryPlannerROS')

    # ideally this would be its own node, figuring out how to adjust the motion based on not only emotion
    def cmdvel_cb(self,data):

        # adjust the incoming linear velocity by simple scaling factor
        # use most recent emotion recorded
        # self.scaling_factor = 1
        if self.emotion == 'neutral':
            self.scaling_factor = 1
        elif self.emotion == 'fear' or 'sad' or 'surprise' or 'disgust':
            self.scaling_factor = 0.5
        elif self.emotion == 'happy' or 'angry':
            self.scaling_factor = 1.5

        adj_data = data
        adj_data.linear.x = adj_data.linear.x * self.scaling_factor

        self.pub_adj.publish(adj_data)

    def paramAdj(self):
        # adjust the incoming linear velocity by simple scaling factor
        # use most recent emotion recorded
        if self.emotion == 'neutral':
            return { 'max_vel_x' : 3 , 'min_vel_x' : 0.4 }
        elif self.emotion == 'fear' or 'sad' or 'surprise' or 'disgust':
            return { 'max_vel_x' : 0.6 , 'min_vel_x' : 0.1 }
        elif self.emotion == 'happy' or 'angry':
            return { 'max_vel_x' : 5 , 'min_vel_x' : 1 }

    def start(self, _img_path):
        rr = rospy.Rate(3)
        while not rospy.is_shutdown():
            try:
                objs = DeepFace.analyze(img_path = _img_path , actions = ['emotion'])
                self.emotion = objs[0]['dominant_emotion']
                self.pub.publish(self.emotion)
                rr.sleep()
            except:
                ...

    def startwDynamicParamters(self, _img_path):
        rr = rospy.Rate(3)
        while not rospy.is_shutdown():
            try:
                rospy.loginfo('Photo!!!!!!')
                self.emotion_prev = self.emotion
                objs = DeepFace.analyze(img_path = _img_path , actions = ['emotion'])
                self.emotion = objs[0]['dominant_emotion']
                self.pub.publish(self.emotion)

                if self.emotion_prev != self.emotion:
                    config = self.client.update_configuration(self.paramAdj())
                    #rospy.loginfo(config)

                rr.sleep()

            except:
                ...



img_path = '/root/ros_ws/src/emotion_detection/scripts/image/face.jpg'
fer = FER()
fer.start(img_path)
