#!/usr/bin/env python
'''Keep Track of goal target'''

import rospy
from std_msgs.msg import String
import actionlib
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal
# sub to the topic that subscribes to marker positions


class GoalController:

    def __init__(self) -> None:
        rospy.init_node('goal_processing')
        self.goal_label_sub  = rospy.Subscriber('/goal_dest', String, self.receive_goal_label_sub)
        self.client = actionlib.SimpleActionClient('move_base',MoveBaseAction)
        self.client.wait_for_server()
        self.GOALS = {
        'kitchen' : [258, 196],
        'bathroom' : [500, 500],
        'table' : [326,410],
        'door' : [100, 150]
        }

    def receive_marker(self, marker):
        ...

    def receive_goal_label_sub(self, goal_label):
        goal = MoveBaseGoal()
        goal.target_pose.header.frame_id = "map"
        goal.target_pose.header.stamp = rospy.Time.now()
        goal.target_pose.pose.position.x = self.GOALS[goal_label.data][0]
        goal.target_pose.pose.position.y = self.GOALS[goal_label.data][1]
        self.client.send_goal(goal)
        rospy.loginfo('Recieved move to'+goal_label+'command')
        wait = self.client.wait_for_result()
        rospy.loginfo(f'{wait}')

    def start(self):
        rr = rospy.Rate(3)
        while not rospy.is_shutdown():
            rr.sleep()

gc = GoalController()
gc.start()
