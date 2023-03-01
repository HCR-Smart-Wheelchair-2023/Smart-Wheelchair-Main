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
import time



class BodyProcessingController:


    def __init__(self) -> None:
        self.tf_buffer = tf2_ros.Buffer()
        self.tf_listener = tf2_ros.TransformListener(self.tf_buffer)
        topic = '/zed/zed_node/obj_det/objects'
        self.sub = rospy.Subscriber(topic, ObjectsStamped, self.receive_objects)
        self.pub = rospy.Publisher('/people', People, queue_size=10)


    def receive_objects(self, message : ObjectsStamped):
        objects = message.objects
        people = [self.process_person(person) for person in message.objects if person.label == '']
        people_msg = People()
        people_msg.header.frame_id = 'map'
        people_msg.header.stamp = rospy.Time.now()
        people_msg.person = people
        self.pub.publish(people_msg)


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
        # static = np.linalg.norm(velocity) < 0.2
        # if static:
        #     theta = self.calculate_orientation(skeleton)
        # else:
        #     theta = np.arctan(velocity[0]/velocity[1])
        theta = 0

        odom = Odometry()
        odom.header.stamp = rospy.Time.now()
        odom.header.frame_id = "map"
        odom.child_frame_id = "map"

        transform =  self.tf_buffer.lookup_transform('map', 'camera_link', rospy.Time.now(), rospy.Duration(1.0))
        
        v = Vector3Stamped()
        v.vector.x = person.velocity[0]
        v.vector.y = person.velocity[1]
        v.vector.z = person.velocity[2] 

        vt = tf2_geometry_msgs.do_transform_vector3(v, transform)
        
        p = PoseStamped()
        p.pose.position.x = position[0]
        p.pose.position.y = position[1]
        p.pose.position.z = position[2]
        p.pose.orientation.x = theta


        pose_transformed = tf2_geometry_msgs.do_transform_pose(p, transform)

        odom.pose.pose = pose_transformed.pose
        odom.twist.twist.linear = vt.vector
        

        new_person = Person()
        new_person.header.frame_id = "map"
        new_person.label.data = person.label
        new_person.static.data = False # static
        new_person.odom = odom
        return new_person



if __name__ == '__main__':
    rospy.init_node('body_processing')
    mp = BodyProcessingController()
    rospy.spin()
    # object_pos1 = Point(1.0, 2.0, 0.0)

    # draw_Gaussian(object_pos1)