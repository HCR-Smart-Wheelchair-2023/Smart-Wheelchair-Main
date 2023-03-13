#! /usr/bin/env python3
"""
This Node takes person detection data from the zed, converts it to the world frame and calculates the orientation of the person from the skeleton data
"""

import rospy
import tf
import tf2_ros
import tf2_geometry_msgs
import sys
import numpy as np
from nav_msgs.msg import Odometry
from geometry_msgs.msg import PoseStamped, Quaternion, Vector3, TransformStamped, Transform, Vector3Stamped
from zed_interfaces.msg import ObjectsStamped
from people_msg.msg import People, Person
from std_msgs.msg import Header
from nav_msgs.msg import Odometry
from geometry_msgs.msg import Point, Pose, Quaternion, Twist, Vector3
from time import sleep
import random
import math


class BodyProcessingController:


    def __init__(self) -> None:
        # self.tf_buffer = tf2_ros.Buffer()
        # self.tf_listener = tf2_ros.TransformListener(self.tf_buffer)
        topic = '/zed/zed_node/obj_det/objects'
        self.sub = rospy.Subscriber(topic, ObjectsStamped, self.receive_objects)
        self.pub = rospy.Publisher('/people', People, queue_size=10)
        self.odom_pub = rospy.Publisher('/people_odom', Odometry, queue_size=10)



    def receive_objects(self, message : ObjectsStamped):
        if message.objects != []:
            print(len(message.objects), ": ",message.header.seq )
        
        # objects = message.objects
        # print("Number of objects detected: ", len(message.objects))
        # people = [self.process_person(person) for person in message.objects]
        # people_msg = People()
        # people_msg.header.frame_id = 'map'
        # people_msg.header.stamp = rospy.Time.now()
        # people_msg.person = people
        # print("Number of People: ", len(people_msg.person))
        # self.pub.publish(people_msg)

        # rate = rospy.Rate(2.5) # 2.5 Hz (same as global map update)
        # rate.sleep()


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
        static = False # np.linalg.norm(velocity) < 0.2
        if static:
            # To Test: actual orientation 
            theta = self.calculate_orientation(skeleton)
        else:
            theta = math.atan2(velocity[1], velocity[0]) 


        odom = Odometry()
        odom.header.stamp = rospy.Time.now()
        odom.header.frame_id = "map"
        odom.child_frame_id = "map"

        # transform =  self.tf_buffer.lookup_transform('map', 'camera_link', rospy.Time.now(), rospy.Duration(1))

        v = Vector3Stamped()
        v.vector.x = person.velocity[0]
        v.vector.y = person.velocity[1]
        v.vector.z = person.velocity[2]

        # vt = tf2_geometry_msgs.do_transform_vector3(v, transform)

        p = PoseStamped()
        p.pose.position.x = position[0]
        p.pose.position.y = position[1]
        p.pose.position.z = position[2]
        (p.pose.orientation.x, p.pose.orientation.y, p.pose.orientation.z, p.pose.orientation.w) = tf.transformations.quaternion_from_euler(0, 0, theta, 'ryxz')


        # pose_transformed = tf2_geometry_msgs.do_transform_pose(p, transform)

        odom.pose.pose = p.pose #pose_transformed.pose
        odom.twist.twist.linear = v.vector #vt.vector
        
        self.odom_pub.publish(odom)

        new_person = Person()
        new_person.header.frame_id = "map"
        new_person.label.data = person.label
        new_person.static.data = static
        new_person.odom = odom
        return new_person



if __name__ == '__main__':
    rospy.init_node('body_processing')
    mp = BodyProcessingController()
    rospy.spin()
