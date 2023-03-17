#! /usr/bin/env python3

import rospy
from geometry_msgs.msg import Twist
import time 
import sys

class HC():
    def __init__(self):
        rospy.init_node('HC')
        #instantiate subscriber and publisher 
        self.pub = rospy.Publisher('cmd_vel', Twist, queue_size=10)

    def start(self, scale=1):

        data = Twist()
        data.linear.x = 1*scale
        self.pub.publish(data)

        time.sleep(3)

        data.linear.x = 0*scale
        self.pub.publish(data) 

        time.sleep(5) 
        
        data.linear.x = 1*scale
        self.pub.publish(data)
        time.sleep(5)
        
        data.angular.z = 1*scale
        self.pub.publish(data)
        time.sleep(2)
        
        data.linear.x = 0*scale
        data.angular.z = 0*scale
        self.pub.publish(data) 

scale = float(sys.argv[1])

hc = HC()
hc.start(scale)
