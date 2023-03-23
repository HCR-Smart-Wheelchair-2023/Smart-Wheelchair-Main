#! /usr/bin/env python3
"""
This Node takes person detection data from the zed, converts it to the world frame and calculates the orientation of the person from the skeleton data
"""

import rospy

from nav_msgs.msg import Path
# import random
import numpy
import numpy as np
# from paho.mqtt import client as mqtt_client
import json
# from json import JSONEncoder
import matplotlib.pyplot as mp
import serial
import time
# from time import sleep
import serial.tools.list_ports
import math
# import keyboard

matrix = []
off = numpy.zeros(400, dtype=object)
# binary_matrix = numpy.zeros((20,20))
binary_list = numpy.zeros(401, dtype=object)
tuple_list = numpy.zeros((401,4), dtype=object)
port_list = serial.tools.list_ports.comports()
# print(port_list[2].device)
arduino = serial.Serial(port='/dev/ttyACM0', baudrate=9600, timeout=0.01)
state = 0
count = 0
matrix_prev = 0
frameBuffer_prev = 0

DIST = 400
angle = -45
rotation = numpy.matrix([[math.cos(math.radians(angle)), -math.sin(math.radians(angle))], [math.sin(math.radians(angle)), math.cos(math.radians(angle))]])
reflection = numpy.matrix([[1, 0],[0, -1]])

def frameByte(xstep, ystep, xdir, ydir):
    return ((xstep<<3) + (ystep<<2) + (xdir<<1) + ydir)


def direction(xdir,ydir):
    if xdir == -1: xdir = 0
    if ydir == -1: ydir = 0

    return [xdir,ydir]

def move(xstep, ystep, state,num):
    if state == 1:
        return[numpy.sign(xstep)*xstep,num]
    else:
        return[num,numpy.sign(ystep)*ystep]


def write(x):
    arduino.write(bytes(x, 'utf-8'))


class LaserPathController:

    MAX_DISTANCE = 1000000

    def __init__(self) -> None:
        topic = '/move_base/TrajectoryPlannerROS/local_plan'
        self.sub = rospy.Subscriber(topic, Path, self.receive_path, queue_size=1)
        self.prev_time = time.time()

    def receive_path(self, path):
        if(time.time() > self.prev_time + 0.5):
            self.prev_time = time.time()
            points = [(pose.pose.position.x, pose.pose.position.y) for pose in path.poses]
            points = [ point for point in points if (
                ((math.pow(point[0],2)+math.pow(point[1],2) )< math.pow(self.MAX_DISTANCE,2))
            )]
            matrix = numpy.asarray(points)
            rospy.loginfo(matrix)
            global count
            global matrix_prev
            global frameBuffer_prev
            if numpy.isclose(matrix[0,:], matrix[-1,:], atol=1e-1).all():
                matrix = numpy.zeros([len(matrix),2])
                matrix_original = matrix
                xn = matrix[:,0]
                yn_list = matrix[:,1]
                state = 2
            else:
                matrix_original = matrix
                matrix = numpy.transpose(numpy.asarray(reflection*numpy.transpose(matrix_original)))
                # print("rotation", rotation)
                for i in range(len(matrix)):
                    if math.isnan(matrix[i,0]):
                        matrix[i,0] = 0
                    if math.isnan(matrix[i,1]):
                        matrix[i,1] = 0
                inc = 1
                print(numpy.isclose(matrix[0,0], matrix[-1,0], atol=1e-1).all())

                use_y = abs(matrix[0,0] - matrix[-1,0]) < abs(matrix[0,1] - matrix[-1,1])
                if use_y:
                    print("before ", matrix)
                    matrix = matrix - matrix[0,:]
                    scale = min(400/matrix[-1,0], 400/matrix[-1,1])
                    # scale = 400/matrix[-1,:]
                    matrix = scale*matrix
                    print("after", matrix)
                    coeff = numpy.polyfit(matrix[:,0],matrix[:,1],2)
                    print("coeff: ", coeff)
                    xn = numpy.arange(matrix[0,0], (matrix[-1,0]) + numpy.sign(matrix[-1,0])*inc, numpy.sign(matrix[-1,0])*inc)
                    # # xn = numpy.arange(0, 401, 1)
                    print("xn: ",xn)
                    yn = numpy.poly1d(coeff)
                    yn_list = numpy.round(yn(xn))
                    print("yn list before: ", yn_list)
                    yn_list = yn_list - yn_list[0]
                    print("yn list after: ", yn_list)
                    # mp.plot( xn,yn_list,matrix[:,0],matrix[:,1],'o')
                    # mp.show()
                    state = 1

                else:
                    print("before ", matrix)
                    matrix = matrix - matrix[0,:]
                    scale = min(400/matrix[-1,0], 400/matrix[-1,1])
                    # scale = 400/matrix[-1,:]
                    matrix = scale*matrix
                    print("after", matrix)
                    coeff = numpy.polyfit(matrix[:,1],matrix[:,0],2)
                    print("coeff: ", coeff)
                    yn = numpy.arange(matrix[0,1], (matrix[-1,1]) + numpy.sign(matrix[-1,1])*inc, numpy.sign(matrix[-1,1])*inc)
                    xn = numpy.poly1d(coeff)
                    print("xn(yn): ",xn(yn))
                    yn_list = numpy.round(yn)
                    xn = numpy.round(xn(yn))
                    xn = xn - xn[0]
                    # mp.plot( xn,yn,matrix[:,0],matrix[:,1],'o')
                    # mp.show()
                    state = 0

            if state == 1:
                rng = len(xn)-1
            if state == 2:
                rng = len(matrix)-1
            else:
                rng = len(yn)-1

            rng = len(xn)
            for i in range(rng):
                binary_list[i] = (int(xn[i]), int(yn_list[i]))
                print(binary_list[i])

            final_tuple = []
            for i in range(1,rng):
                tuple_list[0] = (0, 0, 0, 0)
                x_inc = xn[i]-xn[i-1]
                y_inc = yn_list[i]-yn_list[i-1]
                tuple_list[i,:] = [int(x_inc), int(y_inc), numpy.sign(int(x_inc)), numpy.sign(int(y_inc))]


            for i in range(len(tuple_list)):
                # print(tuple_list[i,:])
                if i > 0:
                    print(tuple_list[i,state])
                    if tuple_list[i,state] == 0:
                        dir_xy = direction(tuple_list[i,2],tuple_list[i,3])
                        move_xy = move(tuple_list[i,0],tuple_list[i,1],state,0)
                        final_tuple.append((move_xy[0],move_xy[1],dir_xy[0],dir_xy[1]))
                    else:

                        while abs(tuple_list[i,state]) >= 1:
                            dir_xy = direction(tuple_list[i,2],tuple_list[i,3])
                            move_xy = move(tuple_list[i,0],tuple_list[i,1],state,1)
                            final_tuple.append((move_xy[0],move_xy[1],dir_xy[0],dir_xy[1]))
                            tuple_list[i,state] = tuple_list[i,state] - numpy.sign(tuple_list[i,state])*1

            if len(final_tuple) < 400:
                for i in range(DIST - len(final_tuple)):
                    final_tuple.append((0,0,0,0))

            if len(final_tuple) > 400:
                print(len(final_tuple))
                print(range(1,len(final_tuple)-3))
                while len(final_tuple) > 400:
                    lim = len(final_tuple)-400
                    rand_ = numpy.random.randint(len(final_tuple), size=lim)
                    rand_.sort()
                    print(rand_)
                    for n in rand_:
                        if n < len(final_tuple):
                            final_tuple.pop(n)


            print(final_tuple)
            print(len(final_tuple))
            frameBuffer = [frameByte(final_tuple[i][0], final_tuple[i][1], final_tuple[i][2], final_tuple[i][3]) for i in range(1,DIST-2)]
            # frameBuffer = [frameByte(final[i][0], final[i][1], final[i][2], final[i][3]) for i in range(1,DIST-2)]
            arduino.write(bytearray(frameBuffer))

            # port = find_arduino()
            print("sent")

# try:
#     run()



if __name__ == '__main__':
    rospy.init_node('laser_controller')
    pathcontroller = LaserPathController()
    rospy.spin()
