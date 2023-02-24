#! /usr/bin/env python3

import rospy

from sensor_msgs.msg import Image
from cv_bridge import CvBridge
from std_msgs.msg import String
from geometry_msgs.msg import Twist

from deepface import DeepFace
import cv2


class GoalPublish():
    def __init__(self):
        rospy.init_node('goal_publisher')
        #instantiate subscriber and publisher 
        self.pub = rospy.Publisher('goal_dest', String, queue_size=10)
    
    # ideally this would be its own node, figuring out how to adjust the motion based on not only emotion
    
    def start(self):
        rr = rospy.Rate(3)
        while not rospy.is_shutdown():
            with open("goal.txt", "w") as f:
                goal = f.read()
                self.pub(goal)
            rr.sleep()

img_path = '../user_interface/image/face.png'
goal = GoalPublish()
goal.start()
