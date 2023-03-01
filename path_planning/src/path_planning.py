#!/usr/bin/env python

import rospy
from geometry_msgs.msg import Point
from nav_msgs.msg import OccupancyGrid
from geometry_msgs.msg import Twist

def path_planning_callback(msg_target, msg_map):
    # This function is called every time a message is received on the "/target" or "/map" topics
    # In this example, we simply print the messages to the console
    rospy.loginfo("Received target message: %s", msg_target)
    rospy.loginfo("Received map message: %s", msg_map)

    # Perform path planning logic here to determine the desired linear and angular velocities
    # In this example, we simply set the linear and angular velocities to 0.0 (for simplicity)
    linear_velocity = 0.0
    angular_velocity = 0.0

    # Create a Twist message with the desired linear and angular velocities
    cmd_vel_msg = Twist()
    cmd_vel_msg.linear.x = linear_velocity
    cmd_vel_msg.angular.z = angular_velocity

    # Publish the Twist message to the "/cmd_vel" topic
    cmd_vel_pub.publish(cmd_vel_msg)

if __name__ == '__main__':
    # Initialize the ROS node
    rospy.init_node('path_planning')

    # Create a subscriber to the "/target" topic
    target_sub = rospy.Subscriber('/target', Point, queue_size=10)
    
    # Create a subscriber to the "/map" topic
    map_sub = rospy.Subscriber('/map', OccupancyGrid, queue_size=10)

    # Create a publisher for the "/cmd_vel" topic
    cmd_vel_pub = rospy.Publisher('/cmd_vel', Twist, queue_size=10)

    # Set up the callback function to handle incoming messages
    rospy.Subscriber('/target', Point, path_planning_callback, callback_args=map_sub)

    # Spin the node so the subscriber and publisher run in separate threads
    rospy.spin()
