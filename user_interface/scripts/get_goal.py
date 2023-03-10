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
            # TODO: update the way we read file paths using os paths
            with open("./goal.txt", "r") as f:
                goal = f.read()
                self.pub.publish(goal)
            rr.sleep()
        # TODO: once shutdown, clear the file -- will probably need a try-except
        

goal = GoalPublish()
goal.start()
