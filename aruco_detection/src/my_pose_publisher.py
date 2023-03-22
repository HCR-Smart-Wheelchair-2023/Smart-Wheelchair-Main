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
    pub_1 = rospy.Publisher("/my_marker/pose_1", PoseStamped, queue_size=10)
    pub_2 = rospy.Publisher("/my_marker/pose_2", PoseStamped, queue_size=10)

    rate = rospy.Rate(10.0)  # Publish at 10 Hz

    # angle_1 is in radians
    angle_x_1 = 0 * math.pi / 180
    angle_y_1 = 0 * math.pi / 180
    angle_z_1 = 0 * math.pi / 180

    quaternion_1 = tf.transformations.quaternion_from_euler(
        angle_x_1, angle_y_1, angle_z_1
    )

    # angle_2 is in radians
    angle_x_2 = 0 * math.pi / 180
    angle_y_2 = 0 * math.pi / 180
    angle_z_2 = 180 * math.pi / 180

    quaternion_2 = tf.transformations.quaternion_from_euler(
        angle_x_2, angle_y_2, angle_z_2
    )
    # print(quaternion)
    while not rospy.is_shutdown():
        try:
            # print("test2")
            # Get the current transformation between two frames

            # create a PoseStamped message for the first marker
            marker_pose_1 = PoseStamped()
            marker_pose_1.header.frame_id = "map"
            marker_pose_1.header.stamp = rospy.Time.now()
            marker_pose_1.pose.position.x = 0
            marker_pose_1.pose.position.y = 3.83
            marker_pose_1.pose.position.z = 1.5
            marker_pose_1.pose.orientation.x = quaternion_1[0]
            marker_pose_1.pose.orientation.y = quaternion_1[1]
            marker_pose_1.pose.orientation.z = quaternion_1[2]
            marker_pose_1.pose.orientation.w = quaternion_1[3]
            # Publish the message
            pub_1.publish(marker_pose_1)

            # create a PoseStamped message for the second marker
            marker_pose_2 = PoseStamped()
            marker_pose_2.header.frame_id = "map"
            marker_pose_2.header.stamp = rospy.Time.now()
            marker_pose_2.pose.position.x = 6.8
            marker_pose_2.pose.position.y = 3.83
            marker_pose_2.pose.position.z = 1.5
            marker_pose_2.pose.orientation.x = quaternion_2[0]
            marker_pose_2.pose.orientation.y = quaternion_2[1]
            marker_pose_2.pose.orientation.z = quaternion_2[2]
            marker_pose_2.pose.orientation.w = quaternion_2[3]
            # Publish the message
            pub_2.publish(marker_pose_2)

            # print(marker_pose)

        except (
            tf.LookupException,
            tf.ConnectivityException,
            tf.ExtrapolationException,
        ):
            rospy.logwarn("Exception occurred while getting the transformation")

        rate.sleep()
