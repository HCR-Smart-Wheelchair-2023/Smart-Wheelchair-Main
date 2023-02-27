#! /usr/bin/env python3
"""
This Node takes person detection data from the zed, converts it to the world frame and calculates the orientation of the person from the skeleton data
"""

import rospy
import tf
import tf2_ros
import sys
import numpy as np
from nav_msgs.msg import Odometry
from geometry_msgs.msg import PoseStamped, Quaternion, Vector3, TransformStamped, Transform
from zed_interfaces import ObjectStamped
from people_msg.People import People
from people_msg.Person import Person
from std_msgs.msg import Header
from nav_msgs.msg import Odometry
from geometry_msgs.msg import Point, Pose, Quaternion, Twist, Vector3
from time import sleep
import time



class BodyProcessingController:


    def __init__(self) -> None:
        self.tf_buffer = tf2_ros.Buffer()
        self.tf_listener = tf2_ros.TransformListener(self.tf_buffer)
        topic = '/NA'
        self.sub = rospy.Subscriber(topic, ObjectStamped, self.receive_objects)

    def receive_objects(self, message : ObjectStamped):
        objects = message.objects
        people = [self.process_person(person) for person in message.objects]

    def calculate_orientation(self, skeleton) -> float:
        left_shoulder = np.array(skeleton.keypoints[2])
        right_shoulder = np.array(skeleton.keypoints[5])
        collar_bone = np.array(skeleton.keypoints[1])

        shoulder_center = np.add(right_shoulder, np.subtract(left_shoulder, right_shoulder))
        vector = np.subtract(collar_bone, shoulder_center)
        orientation = np.arctan(vector[0]/vector[1])
        return orientation

    def process_person(self, person):
        skeleton = person.skeleton_3d
        position = np.array(person.position)
        velocity = np.array(person.velocity)

        # calculate orientation from velocity
        if np.linalg.norm(velocity) < 0.2:
            theta = self.calculate_orientation(skeleton)
        else:
            theta = np.arctan(velocity[0]/velocity[1])

        odom = Odometry()
        odom.header.stamp = rospy.Time.now()
        odom.header.frame_id = "map"
        odom.child_frame_id = "map"
        odom.pose.pose = Pose(Point(position[0], position[1], 0.0), Quaternion(0,0,theta,0))
        odom.twist.twist = Twist(Vector3(velocity[0], velocity[1], 0), Vector3(0, 0, 0))
        person = Person()
        person.header.frame_id = "map"
