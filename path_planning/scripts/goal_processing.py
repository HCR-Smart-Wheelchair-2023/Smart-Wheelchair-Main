#!/usr/bin/env python
'''Keep Track of goal target'''

import rospy
from std_msgs.msg import String
import actionlib
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal
from geometry_msgs.msgs import PoseStamped
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
        self.goal_label_sub  = rospy.Subscriber('/goal_dest', String, self.receive_goal_label_sub)
        self.pub = rospy.Publisher('/move_base_simple/goal', MoveBaseGoal, queue_size=10)
        #self.client = actionlib.SimpleActionClient('/move_base',MoveBaseAction)
        #self.client.wait_for_server()
        rospy.spin()

    def receive_marker(self, marker):
        ...

    def receive_goal_label_sub(self, goal_label):

        if goal_label.data not in self.GOALS:
            return
        goal = PoseStamped()
        goal.target_pose.header.frame_id = "map"
        goal.target_pose.header.stamp = rospy.Time.now()
        #rospy.loginfo(f'{self.__dict__}')
        goal.target_pose.pose.position.x = self.GOALS[goal_label.data][0]
        goal.target_pose.pose.position.y = self.GOALS[goal_label.data][1]

        goal.target_pose.pose.orientation.z = 0.342
        goal.target_pose.pose.orientation.w = 0.940
        self.pub.publish(goal.target_pose)
        #self.client.send_goal(goal)
        #rospy.loginfo('Recieved move to'+goal_label.data+'command')
        rospy.loginfo(f'Goal {goal.target_pose}')
        #wait = self.client.wait_for_result()
        #rospy.loginfo(f'{wait}')

    # def start(self):
    #     rr = rospy.Rate(3)
    #     while not rospy.is_shutdown():
    #         rr.sleep()

gc = GoalController()
# gc.start()
