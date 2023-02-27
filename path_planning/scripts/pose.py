#! /usr/bin/env python3
"""
This Node takes the data from the /pose topic and sets the frames such that map-base_link are correct
"""

import rospy
import tf
import tf2_ros
import sys
import numpy as np
from nav_msgs.msg import Odometry
from geometry_msgs.msg import PoseStamped, Quaternion, Vector3, TransformStamped, Transform, Pose
from std_msgs.msg import Header
from time import sleep
import time


class PoseController:

    MARKERS = {

    }

    def __init__(self) -> None:
        # the current pose with offset
        self.received_message = False
        # add the start pose
        translation = Vector3(x=0,
                              y=0, z=0)
        rotation = Quaternion(x=0, y=0, z=0,
                              w=0)
        transform = TransformStamped(
            header=Header(
                stamp=rospy.Time.now(), frame_id="map"),
            child_frame_id="base_link",
            transform=Transform(
                translation=translation, rotation=rotation),
        )
        self.pose = transform
        self.timer = rospy.Timer(rospy.Duration(0.2), self.publish_frames)
        self.sub = rospy.Subscriber(
            '/zed2i/zed_node/pose', PoseStamped, self.pose_callback)

        marker_topic = '/aruco_single/pose'
        self.marker_topic = rospy.Subscriber(
            marker_topic, PoseStamped, self.receive_markers)

        self.tf_buffer = tf2_ros.Buffer()
        self.tf_listener = tf2_ros.TransformListener(self.tf_buffer)

    def receive_markers(self, msg):
        # print(msg)
        # rospy.loginfo("test")
        rospy.loginfo(str(msg))

        # marker_code = ''
        # marker_pose = self.MARKERS[marker_code]

        # # translation from the robot to the marker
        # translation = Vector3(x=msg.pose.position.x,
        #                       y=msg.pose.position.y, z=msg.pose.position.z)
        # rotation = Quaternion(x=msg.pose.pose.orientation.x, y=msg.pose.pose.orientation.y, z=msg.pose.pose.orientation.z,
        #                       w=msg.pose.pose.orientation.w)
        # take the marker pose and subtract the translation and rotation
        # inverse_transform = tf2_ros.transformations.inverse_transform(odom_base)
        # result_transform = tf2_ros.transformations.concatenate_transforms(
        #     self.pose, inverse_transform.transform
        # )

        # subtract the current map-baselink frame to find the offset value

        # try:
        #     odom_base = self.tf_buffer.lookup_transform(
        #         'base_link', 'odom', rospy.Time())
        # except Exception:
        #     return

        # inverse_transform = tf2_ros.transformations.inverse_transform(odom_base)
        # result_transform = tf2_ros.transformations.concatenate_transforms(
        #     self.pose, inverse_transform.transform
        # )




        # calculate the transform from the wheelchair to the marker in the map frame
        # add the transform of the maker
        # subtract the map-baselink frame to find offset
        # save offset

    def pose_callback(self, msg: PoseStamped):
        # rospy.loginfo("Hello, ROS!")
        # self.pose = np.array((msg.pose.position.x, msg.pose.pose.position.y, msg.pose.pose.position.z,
        #                       msg.pose.pose.orientation.x, msg.pose.pose.orientation.y, msg.pose.pose.orientation.z, msg.pose.pose.orientation.w))
        # # TODO add start pose
        # self.received_message = True

        # TODO handle start pose

        translation = Vector3(x=msg.pose.position.x,
                              y=msg.pose.position.y, z=msg.pose.position.z)
        rotation = Quaternion(x=msg.pose.pose.orientation.x, y=msg.pose.pose.orientation.y, z=msg.pose.pose.orientation.z,
                              w=msg.pose.pose.orientation.w)
        transform = TransformStamped(
            header=Header(
                stamp=rospy.Time.now(), frame_id="map"),
            child_frame_id="base_link",
            transform=Transform(
                translation=translation, rotation=rotation),
        )
        self.pose = transform
        self.received_message = True

    def publish_frames(self):
        br = tf.TransformBroadcaster()
        if not self.received_message:
            br.sendTransform((0, 0, 0),
                             (0, 0, 0, 0),
                             rospy.Time.now(),
                             "odom",
                             "map")
            return

        # publish the current pose and offset
        # transform = np.array((0,0,0,0,0,0,0))
        # transform = np.add(transform, self.pose)
        # transform = np.add(transform, self.pose_offset)
        # transform = self.pose
        # translation = Vector3(x=transform[0], y=transform[1], z=transform[2])
        # rotation = Quaternion(
        #     x=transform[3], y=transform[4], z=transform[5], w=transform[6])

        # find the transform from map to base_link
        try:
            odom_base = self.tf_buffer.lookup_transform(
                'base_link', 'odom', rospy.Time())
        except Exception:
            br.sendTransform((0, 0, 0),
                             (0, 0, 0, 0),
                             rospy.Time.now(),
                             "odom",
                             "map")
            return

        inverse_transform = tf2_ros.transformations.inverse_transform(odom_base)
        result_transform = tf2_ros.transformations.concatenate_transforms(
            self.pose, inverse_transform.transform
        )

        transform = TransformStamped(
            header=Header(
                stamp=rospy.Time.now(), frame_id="map"),
            child_frame_id="odom",
            transform=Transform(
                translation=result_transform.translation, rotation=result_transform.rotation),
        )
        br.sendTransform(transform)

        # # send the transform between map and odom
        # br.sendTransform(transform[:3],
        #                  Quaternion(*transform[3:]),
        #                  rospy.Time.now(),
        #                  "odom",
        #                  "map")


if __name__ == '__main__':
    rospy.init_node('pose_controller')
    controller = PoseController()
    rospy.spin()
