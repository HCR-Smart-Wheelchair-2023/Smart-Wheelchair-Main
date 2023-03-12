#!/usr/bin/env python
import rospy
import random
import math

from std_msgs.msg import String
from people_msg.msg import People, Person
from zed_interfaces.msg import ObjectsStamped, Object
from sensor_msgs.msg import Imu
from nav_msgs.msg import Odometry
from geometry_msgs.msg import Point




rospy.init_node('zed_dummy')

# sub = rospy.Subscriber('/imu', Imu, convert_and_publish)
# TODO: ROS BAG
pub = rospy.Publisher('/zed/zed_node/obj_det/objects', ObjectsStamped, queue_size=10)

rate = rospy.Rate(1)


while not rospy.is_shutdown():

    

    object_pos1 = Point(1.0, 2.0, 0.0)
    velocity1 = Point(random.uniform(-2, 2), random.uniform(-2, 2), 0.0)
    object_pos2 = Point(5.0, 2.0, 0.0)
    velocity2 = Point(random.uniform(-2, 2), random.uniform(-2, 2), 0.0)
    object_pos3 = Point(10.0, 3.0, 0.0)
    velocity3 = Point(random.uniform(-2, 2), random.uniform(-2, 2), 0.0)

    objs = [[object_pos1, velocity1], [object_pos2, velocity2], [object_pos3, velocity3]]


    # people_msg = People()

    # for obj in range(1, 6):
    #     odom_msg = Person()
    #     # Fill in the data for the odom_msg object
    #     odom_msg.odom.pose.pose.position = Point(random.uniform(-5, 5), random.uniform(-5, 5), 0.0)
    #     odom_msg.odom.twist.twist.linear = Point(random.uniform(-2, 2), random.uniform(-2, 2), 0.0)
        
    #     b = random.choice([True, False])
    #     odom_msg.static.data = b
    #     if b:
    #         odom_msg.odom.pose.pose.orientation.x = random.uniform(0, math.pi)
            

    #     people_msg.person.append(odom_msg)

    people_msg = ObjectsStamped()
    for obj in range(1, 2):
        odom_msg = Object()

        odom_msg.position = [0, 0, 0] #random.uniform(-5, 5), random.uniform(-5, 5), 0.0]
        odom_msg.velocity = [random.uniform(-0.2, 0.2), random.uniform(-0.2, 0.2), 0.0]
        
        people_msg.objects.append(odom_msg)

    pub.publish(people_msg)
    rate.sleep()