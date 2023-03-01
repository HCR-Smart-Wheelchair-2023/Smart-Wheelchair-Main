#! /usr/bin/env python3

import rospy

from std_msgs.msg import String

class GoalPublish():
    def __init__(self):
        rospy.init_node('goal_publisher')
        #instantiate publisher 
        self.pub = rospy.Publisher('goal_dest', String, queue_size=10)
        
    def start(self):
        rr = rospy.Rate(3)
        while not rospy.is_shutdown():
            with open("./goal.txt", "r") as f:
                goal = f.read()
                self.pub.publish(goal)
            rr.sleep()

goal = GoalPublish()
goal.start()
