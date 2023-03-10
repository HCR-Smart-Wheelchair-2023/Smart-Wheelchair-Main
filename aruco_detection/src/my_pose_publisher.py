#!/usr/bin/env python3

import rospy
import tf
from geometry_msgs.msg import PoseStamped, TransformStamped
import time
import math

if __name__ == "__main__":
    rospy.init_node("Marker_pose_publisher_node")

    # Set up a transform listener to get the current transformation between two frames
    listener = tf.TransformListener()

    # Set up the transform publisher
    # pub = rospy.Publisher("/my_transform_stamped", TransformStamped, queue_size=10)
    pub = rospy.Publisher("/my_marker/pose", PoseStamped, queue_size=10)

    rate = rospy.Rate(10.0)  # Publish at 10 Hz

    print("test1")
    time.sleep(2)

    # angle is in radians
    angle = math.pi / 2
    quaternion = tf.transformations.quaternion_from_euler(0, 0, angle)
    print(quaternion)
    while not rospy.is_shutdown():
        try:
            print("test2")
            # Get the current transformation between two frames

            # create a PoseStamped message for the marker
            marker_pose = PoseStamped()
            marker_pose.header.frame_id = "map"
            marker_pose.header.stamp = rospy.Time.now()
            marker_pose.pose.position.x = 0.87
            marker_pose.pose.position.y = 7.74
            marker_pose.pose.position.z = 1.42
            marker_pose.pose.orientation.x = quaternion[0]
            marker_pose.pose.orientation.y = quaternion[1]
            marker_pose.pose.orientation.z = quaternion[2]
            marker_pose.pose.orientation.w = quaternion[3]
            # Publish the message
            pub.publish(marker_pose)
            print(marker_pose)

        except (
            tf.LookupException,
            tf.ConnectivityException,
            tf.ExtrapolationException,
        ):
            rospy.logwarn("Exception occurred while getting the transformation")

        rate.sleep()
