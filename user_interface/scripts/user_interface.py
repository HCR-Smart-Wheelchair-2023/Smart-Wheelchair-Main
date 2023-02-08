#! /usr/bin/env python3
"""
This is a basic implementation of a ROS node called user_interface 
that subscribes to the topic /user_input which is a string message 
and publishes to the topic /target which is a set of coordinates

The aim of this node is to identify the coordinates of a way point from a name.
"""

import rospy
from geometry_msgs.msg import Point
from std_msgs.msg import String


def callback(data):
    # callback function to handle the incoming string message
    input_string = data.data

    # processing the input string to extract the target coordinates
    target_coordinates = process_input(input_string)
    
    # publishing the target coordinates
    pub.publish(target_coordinates)

def process_input(input_string):

    # TODO: match name to way-point coordinates

    # Basic 'pass' sol
    # logic to process the input string and extract the target coordinates
    target = Point()
    target.x = 0.0
    target.y = 0.0
    target.z = 0.0
    return target

if __name__ == '__main__':
    rospy.init_node('user_interface')

    sub = rospy.Subscriber('/user_input', String, callback)

    pub = rospy.Publisher('/target', Point, queue_size=10)

    rospy.spin()