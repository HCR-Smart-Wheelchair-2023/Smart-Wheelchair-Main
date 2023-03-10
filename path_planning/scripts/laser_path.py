#! /usr/bin/env python3
"""
This Node takes person detection data from the zed, converts it to the world frame and calculates the orientation of the person from the skeleton data
"""

import rospy
import tf
import math
import tf2_ros
import tf2_geometry_msgs
import sys
from nav_msgs.msg import Path
import random
import tf
import tf2_ros
import tf2_geometry_msgs
import numpy
import numpy as np
import json
import matplotlib.pyplot as mp
import serial
import time
from time import sleep
# import serial.tools.list_ports

matrix = []
off = numpy.zeros(400, dtype=object)
# binary_matrix = numpy.zeros((20,20))
binary_list = numpy.zeros(400, dtype=object)
tuple_list = numpy.zeros((400,4), dtype=object)

arduino = serial.Serial(port='/dev/ttyACM0', baudrate=9600, timeout=0.01)

DIST = 400



# {"array": [[1, 1], [40, 120], [150, 250], [180, 350], [400, 400]]}
# {"array": [[1, 1], [120, 120], [250, 250], [350, 350], [400, 400]]}
# {"array": [[1, 1], [120, 1], [250, 1], [350, 1], [400, 1]]}
# {"array": [[1, 1], [50, 1], [100, 50], [200, 100], [400, 400]]}


def frameByte(xstep, ystep, xdir, ydir):
    return ((xstep<<3) + (ystep<<2) + (xdir<<1) + ydir)

# def find_arduino(port=None):
#     """Get the name of the port that is connected to Arduino."""
#     if port is None:
#         ports = serial.tools.list_ports.comports()
#         for p in ports:
#             if p.manufacturer is not None and "Arduino" in p.manufacturer:
#                 port = p.device
#     return port


def direction(xdir,ydir):
    if xdir == -1: xdir = 0
    if ydir == -1: ydir = 0

    return [xdir,ydir]


def write(x):
    arduino.write(bytes(x, 'utf-8'))


class LaserPathController:

    MAX_DISTANCE = 1000000000000000

    def __init__(self) -> None:
        topic = '/move_base/TrajectoryPlannerROS/local_plan'
        self.sub = rospy.Subscriber(topic, Path, self.receive_path)
        self.tf_buffer = tf2_ros.Buffer()
        self.tf_listener = tf2_ros.TransformListener(self.tf_buffer)

    def receive_path(self, path):
        # rospy.loginfo(f'{path.poses}')
        transform =  self.tf_buffer.lookup_transform('odom', 'base_link', rospy.Time.now(), rospy.Duration(0.1))
        points = [(
            tf2_geometry_msgs.do_transform_pose(pose,transform)
            # pose
        ) for pose in path.poses]
        rospy.loginfo('#######1')
        rospy.loginfo(str(points))
        rospy.loginfo('#######')
        points = [(pose.pose.position.x * 400, pose.pose.position.y * 400) for pose in points]
        points = [ point for point in points if (
            ((math.pow(point[0],2)+math.pow(point[1],2) )< math.pow(self.MAX_DISTANCE,2))
        )]
        rospy.loginfo('#######2')
        rospy.loginfo(str(points))
        rospy.loginfo('#######')
        # rospy.loginfo(str(points))
        matrix = numpy.asarray(points)
        rospy.loginfo('#######')
        rospy.loginfo(str(matrix))
        rospy.loginfo('#######')
        coeff = numpy.polyfit(matrix[:,0],matrix[:,1],2)
        inc = 1
        xn = numpy.arange(matrix[0,0], (matrix[len(matrix)-1,0]) + inc, inc)
        yn = numpy.poly1d(coeff)
        # mp.plot( xn,yn(xn),matrix[:,0],matrix[:,1],'o')
        # mp.show()
        yn_list = numpy.round(yn(xn))

        # print(yn_list)
        # print("equation= ",yn)
        for i in range(len(xn)):
            if i <= 400:
                binary_list[i] = (xn[i], int(yn_list[i]))
                print(binary_list[i])

        final_tuple = []
        for i in range(len(xn)):
            tuple_list[0] = (0, 0, 0, 0)
            if i <= 400:
                x_inc = xn[i]-xn[i-1]
                y_inc = yn_list[i]-yn_list[i-1]

                tuple_list[i,:] = [int(x_inc), int(y_inc), numpy.sign(int(x_inc)), numpy.sign(int(y_inc))]

        for i in range(len(tuple_list)):
            # print(tuple_list[i,:])
            if i > 0:
                if tuple_list[i,1] == 0:
                    dir_xy = direction(tuple_list[i,2],tuple_list[i,3])
                    final_tuple.append((tuple_list[i,0],0,dir_xy[0],dir_xy[1]))
                else:
                    while abs(tuple_list[i,1]) >= 1:
                        dir_xy = direction(tuple_list[i,2],tuple_list[i,3])
                        final_tuple.append((tuple_list[i,0],1,dir_xy[0],dir_xy[1]))
                        tuple_list[i,1] = tuple_list[i,1] - numpy.sign(tuple_list[i,1])*1

        if len(final_tuple) < 400:
            for i in range(DIST - len(final_tuple)):
                final_tuple.append((0,0,0,0))

        if len(final_tuple) > 400:
            # print(len(final_tuple))
            # print(range(1,len(final_tuple)-3))
            while len(final_tuple) > 400:
                lim = len(final_tuple)-400
                rand_ = numpy.random.randint(len(final_tuple), size=lim)
                rand_.sort()
                print(rand_)
                for n in rand_:
                    if n < len(final_tuple):
                        final_tuple.pop(n)


        # print(final_tuple)
        # print(len(final_tuple))
        # print(tuple_list)
        # print(final_tuple)
        # print(len(final_tuple))
        frameBuffer = [frameByte(final_tuple[i][0], final_tuple[i][1], final_tuple[i][2], final_tuple[i][3]) for i in range(1,DIST-2)]
        # frameBuffer = [frameByte(final[i][0], final[i][1], final[i][2], final[i][3]) for i in range(1,DIST-2)]
        arduino.write(bytearray(frameBuffer))
        # port = find_arduino()
        # print(port)

# try:
#     run()

# except KeyboardInterrupt:
#     print("done")
#     frameBuffer = [frameByte(off[i], off[i], off[i], off[i]) for i in range(DIST-1)]
#     print(off)
#     arduino.write(bytearray(frameBuffer))
#     time.sleep(1)
#     arduino.close()
#     sys.exit(0)


if __name__ == '__main__':
    rospy.init_node('laser_controller')
    mp = LaserPathController()
    rospy.spin()
