#!/usr/bin/env python
'''Keep Track of goal target'''

import rospy
from std_msgs.msg import String
import actionlib
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal
# sub to the topic that subscribes to marker positions


class GoalController:

    GOALS = {
        'kitchen' : [1126,576],
        'bathroom' : [1126,1076],
        'table' : [1126,376],
        'door' : [1126,176]
    }

    def __init__(self) -> None:
        self.goal_label_sub  = rospy.Subscriber('/goal_dest', String, self.receive_goal_label_sub)
        self.client = actionlib.SimpleActionClient('move_base',MoveBaseAction)
        self.client.wait_for_server()

    def receive_marker(self, marker):
        ...

    def receive_goal_label_sub(self, goal_label):
        if goal_label == 'kitchen':
            goal = MoveBaseGoal()
            goal.target_pose.header.frame_id = "map"
            goal.target_pose.header.stamp = rospy.Time.now()
            goal.target_pose.pose.position.x = 1126
            goal.target_pose.pose.position.y = 576
            self.client.send_goal(goal)
            rospy.loginfo('Recieved move to'+goal_label+'command')
            wait = self.client.wait_for_result()
            rospy.loginfo(f'{wait}')
