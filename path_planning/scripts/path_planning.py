#! /usr/bin/env python3
"""
This is a simple example of a node called "path_planning"
that subscribes to the "/obj_map" topic of type "sensor_msgs/PointCloud2"
and publishes to the "/cmd_vel" topic.

The aim of this node is to use the map and target to plan a path and publish the commands
"""

#!/usr/bin/env python
import rospy
from sensor_msgs.msg import PointCloud2
from geometry_msgs.msg import Point, Twist
from sensor_msgs import point_cloud2

class PathPlanningNode:
    def __init__(self):
        # Initialize node
        rospy.init_node('path_planning')

        # Subscriber for "/obj_map"
        rospy.Subscriber("/obj_map", PointCloud2, self.obj_map_callback)

        # Subscriber for "/target"
        rospy.Subscriber("/target", Point, self.target_callback)

        # Publisher for "/cmd_vel"
        self.cmd_vel_pub = rospy.Publisher("/cmd_vel", Twist, queue_size=10)

        # Member variable to store target coordinates
        # self.target = None

    def obj_map_callback(self, msg):
        # Process point cloud data from "/obj_map"
        points = point_cloud2.read_points(msg, field_names=("x", "y", "z"), skip_nans=True)
        for p in points:
            #rospy.loginfo("Point: (%.2f, %.2f, %.2f)", p[0], p[1], p[2])

        # Plan path to target
        if self.target:
            #rospy.loginfo("Target: (%.2f, %.2f, %.2f)", self.target.x, self.target.y, self.target.z)

            # Generate and publish Twist message for turtle simulation
            twist = Twist()
            twist.linear.x = 0.5
            twist.angular.z = 0.5
            self.cmd_vel_pub.publish(twist)

    def target_callback(self, msg):
        # Store target coordinates
        self.target = msg

if __name__ == '__main__':
    try:
        node = PathPlanningNode()
        rospy.spin()
    except rospy.ROSInterruptException:
        pass
