#! /usr/bin/env python3

import rospy
from std_msgs.msg import String

import sys 

file = '/root/ros_ws/src/user_interface/scripts/goal.txt'

class GoalPublish():
    def __init__(self):

        with open(file, "w") as f:
            goal = f.write('')

        rospy.init_node('goal_publisher')
        #instantiate publisher 
        self.pub = rospy.Publisher('goal_dest', String, queue_size=10)
        
        
    def start(self):
        rr = rospy.Rate(3)
        while not rospy.is_shutdown():
            # TODO: update the way we read file paths using os paths
            with open(file, "r") as f:
                goal = f.read()
                self.pub.publish(goal)
            rr.sleep()
        

goal = GoalPublish()
goal.start()
