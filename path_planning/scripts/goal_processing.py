#!/usr/bin/env python
'''Keep Track of goal target'''

import rospy
from std_msgs.msg import String
import actionlib
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal
from geometry_msgs.msg import PoseStamped
# sub to the topic that subscribes to marker positions


class GoalController:

    def __init__(self) -> None:
        self.GOALS = {
            'kitchen' : [2.00, 5],
            'bathroom' : [4.40, 1.50],
            'table' : [6.30, 5.40],
            'door' : [1.40, 0.35]
        }
        rospy.init_node('goal_processing')
        rospy.loginfo(f'initign node')
        self.goal_label_sub  = rospy.Subscriber('/goal_dest', String, self.receive_goal_label_sub)
        self.pub = rospy.Publisher('/move_base_simple/goal', PoseStamped, queue_size=2)
        rospy.loginfo(f'initided pub')
        #self.client = actionlib.SimpleActionClient('/move_base',MoveBaseAction)
        #self.client.wait_for_server()
        rospy.spin()

    def receive_marker(self, marker):
        ...

    def receive_goal_label_sub(self, goal_label):
        rospy.loginfo(f'alsjkdvbaivbalkvbalkvb')
        if goal_label.data not in self.GOALS:
            return
        goal = PoseStamped()
        goal.header.frame_id = "map"
        goal.header.stamp = rospy.Time.now()
        #rospy.loginfo(f'{self.__dict__}')
        goal.pose.position.x = self.GOALS[goal_label.data][0]
        goal.pose.position.y = self.GOALS[goal_label.data][1]

        goal.pose.orientation.z = 0.342
        goal.pose.orientation.w = 0.940
        self.pub.publish(goal)
        #self.client.send_goal(goal)
        #rospy.loginfo('Recieved move to'+goal_label.data+'command')
        rospy.loginfo(f'Goal {goal}')
        #wait = self.client.wait_for_result()
        #rospy.loginfo(f'{wait}')

    # def start(self):
    #     rr = rospy.Rate(3)
    #     while not rospy.is_shutdown():
    #         rr.sleep()

gc = GoalController()
# gc.start()
