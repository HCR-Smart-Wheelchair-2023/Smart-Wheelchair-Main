#! /usr/bin/env python3

import rospy
import tf
import tf2_ros
import tf2_geometry_msgs
import sys
import numpy as np
from nav_msgs.msg import Odometry
from geometry_msgs.msg import PoseStamped, Quaternion, Vector3, TransformStamped, Transform, Vector3Stamped
from zed_interfaces.msg import ObjectsStamped
from people_msg.msg import People, Person
from std_msgs.msg import Header
from nav_msgs.msg import Odometry
from geometry_msgs.msg import Point, Pose, Quaternion, Twist, Vector3
from time import sleep
import time



class actor_information_conversion:


    def __init__(self) -> None:
        self.sub = rospy.Subscriber('/odom_actor', Odometry, self.receive_objects)
        self.pub = rospy.Publisher('/people', People, queue_size=10)


    def receive_objects(self, message : Odometry):
        actor = Person()
        actor.odom = message
        actor.static.data = False
        actor.label.data = " "

        actors = People()
        actors.person = [actor]

        self.pub.publish(actors)


if __name__ == '__main__':
    rospy.init_node('actor_msg_maker')
    mp = actor_information_conversion()
    rospy.spin()
