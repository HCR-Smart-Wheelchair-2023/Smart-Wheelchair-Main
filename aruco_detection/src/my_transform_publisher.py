#!/usr/bin/env python3

import rospy
import tf
from geometry_msgs.msg import TransformStamped
import time

if __name__ == "__main__":
    rospy.init_node("transform_publisher_node")

    # Set up a transform listener to get the current transformation between two frames
    listener = tf.TransformListener()

    # Set up the transform publisher
    pub = rospy.Publisher("/my_transform_stamped", TransformStamped, queue_size=10)

    rate = rospy.Rate(10.0)  # Publish at 10 Hz

    print("test1")
    time.sleep(5)

    while not rospy.is_shutdown():
        try:
            print("test2")
            # Get the current transformation between two frames

            # Create a TransformStamped message
            ts = TransformStamped()
            ts.header.stamp = rospy.Time.now()
            ts.header.frame_id = "/odom"
            ts.child_frame_id = "/base_link"
            ts.transform.translation.x = 3
            ts.transform.translation.y = 0
            ts.transform.translation.z = 0
            ts.transform.rotation.x = 0
            ts.transform.rotation.y = 0
            ts.transform.rotation.z = 0
            ts.transform.rotation.w = 1

            # Publish the message
            pub.publish(ts)
            print(ts)

        except (
            tf.LookupException,
            tf.ConnectivityException,
            tf.ExtrapolationException,
        ):
            rospy.logwarn("Exception occurred while getting the transformation")

        rate.sleep()
