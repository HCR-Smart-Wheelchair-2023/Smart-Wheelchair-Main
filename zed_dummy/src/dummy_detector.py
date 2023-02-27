#!/usr/bin/env python
import rospy
import random

from std_msgs.msg import String
from people_msg.msg import People, Person
# from zed_interfaces.msg import ObjectsStamped, Object

from nav_msgs.msg import Odometry
from geometry_msgs.msg import Point



rospy.init_node('zed_dummy')

pub = rospy.Publisher('/tracked_people', People, queue_size=10)
rate = rospy.Rate(0.1)


while not rospy.is_shutdown():

    people_msg = People()

    object_pos1 = Point(1.0, 2.0, 0.0)
    velocity1 = Point(random.uniform(-2, 2), random.uniform(-2, 2), 0.0)
    object_pos2 = Point(5.0, 2.0, 0.0)
    velocity2 = Point(random.uniform(-2, 2), random.uniform(-2, 2), 0.0)
    object_pos3 = Point(10.0, 3.0, 0.0)
    velocity3 = Point(random.uniform(-2, 2), random.uniform(-2, 2), 0.0)

    objs = [[object_pos1, velocity1], [object_pos2, velocity2], [object_pos3, velocity3]]

    for obj in range(1, 3):
        odom_msg = Person()
        # Fill in the data for the odom_msg object
        odom_msg.odom.pose.pose.position = Point(random.uniform(-5, 5), random.uniform(-5, 5), 0.0)
        odom_msg.odom.twist.twist.linear = Point(random.uniform(-2, 2), random.uniform(-2, 2), 0.0)

        people_msg.person.append(odom_msg)


    pub.publish(people_msg)
    rate.sleep()