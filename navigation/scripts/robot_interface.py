#! /usr/bin/env python3
"""
Personal Robotics Laboratory - Imperial College London, 2021
Authors:
    - Rodrigo Chacon Quesada (rac17@ic.ac.uk)
    - Haining Luo (haining.luo18@imperial.ac.uk)
    - Cedric Goubard (c.goubard21@imperial.ac.uk)


Inspired from https://github.com/redragonx/can2RNET
Original code was modified to:
    - make it work with ROS Noetic
    - adapt to the specificities of our joysticks
    - work in our dockerised setup

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
<http://www.apache.org/licenses/LICENSE-2.0>.
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""
from ctypes import ArgumentError
import os
import sys
import socket
from time import sleep

import rospy
import numpy as np
from sensor_msgs.msg import Joy
from geometry_msgs.msg import Twist


class rmv_ros_simple:

    def __init__(self, pi_ip, pi_port, topic_name="/joy"):
        self.cmd_event = ' :00'
        self.pi_ip = pi_ip
        self.pi_port = pi_port
        self.ip_socket = self.open_ip_socket()
        self.ang_deg_cmd = 0.0
        self.lin_cmd = 0.0

        self.invert_factor = -1

        #subscriber
        if topic_name == "/joy": topic_name="/cmd_vel"
        self.sub = rospy.Subscriber(topic_name, Twist, self.call_back_twist, queue_size=1)
        rospy.loginfo("Subscribed to %s", topic_name)

    def run(self):
        while not rospy.is_shutdown():
            #rospy.loginfo("Sending %s, %s", str(self.ang_deg_cmd), str(self.lin_cmd))
            self.socket_send(('x:'+self.dec2hex(self.ang_deg_cmd,2)+'y:'+self.dec2hex(self.lin_cmd,2)+self.cmd_event+'\r'))
            sleep(0.1)

    def shutdown(self):
        rospy.loginfo("Closing Socket")
        self.ip_socket.shutdown(socket.SHUT_RDWR)
        self.ip_socket.close()

    def open_ip_socket(self):

        try:
            ipsocket = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
        except socket.error:
            rospy.logerr("Failed to create ipsocket")
            sys.exit()

        rospy.loginfo("Joystick over IP server socket created")
        ipsocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        rospy.loginfo("Attempting connection to "+self.pi_ip+':'+self.pi_port)
        reconnect = True

        while reconnect:
            try:
                ipsocket.connect((self.pi_ip, int(self.pi_port)))
                reconnect = False
            except socket.gaierror:
                rospy.logwarn("Hostname could not be resolved.")
                sys.exit()
            except IOError as e:
                if str(e) == '[Errno 111] Connection refused':
                    rospy.logwarn("Connection refused... trying again")
                    reconnect = True

        rospy.loginfo("Socket connected to:" + self.pi_ip + ':' + self.pi_port)

        return(ipsocket)

    def call_back_joy(self, joy_msg):

        # move to updown
        if joy_msg.buttons[0] == 1:
            self.socket_send(('x:'+self.dec2hex(0,2)+'y:'+self.dec2hex(0,2)+' :01'+'\r'))
            return

        # updown to move
        if joy_msg.buttons[1] == 1:
            self.socket_send(('x:'+self.dec2hex(0,2)+'y:'+self.dec2hex(0,2)+' :02'+'\r'))
            return

        # TEST: play a tune
        if joy_msg.buttons[2] == 1:
            self.socket_send(('x:'+self.dec2hex(0,2)+'y:'+self.dec2hex(0,2)+' :03'+'\r'))
            return

        # Ignore residual movement from the joystick
        if abs(joy_msg.axes[0]) * 32767 > 4096:
            # ROS joystick values are scaled in the range from -1 to 1,
            # they need to be scales back to the original range from -32767 to +32767.
        	self.ang_deg_cmd = 0x100 + int(joy_msg.axes[0]* self.invert_factor * 32767 * 100 / 128) >> 8 &0xFF
        else:
        	self.ang_deg_cmd = 0

        if abs(joy_msg.axes[1]) * 32767 > 4096:
        	self.lin_cmd = 0x100 - int(joy_msg.axes[1]* self.invert_factor * 32767 * 100 / 128) >> 8 &0xFF
        else:
        	self.lin_cmd = 0

    def call_back_twist(self, cmd_msg):
        # rospy.loginfo(cmd_msg)
        # parse the command signals
        amplifier = 10
        self.ang_deg_cmd = np.clip(cmd_msg.angular.z/1.57*amplifier, -1, 1)
        self.lin_cmd = cmd_msg.linear.x + cmd_msg.linear.y
        self.lin_cmd = np.clip(self.lin_cmd*amplifier, -1, 1)

        # Move base command signal ranges from -1 to 1,
        # they need to be scales back to the original range from -32767 to +32767.
        self.ang_deg_cmd = 0x100 - int(self.ang_deg_cmd* -self.invert_factor * 32767 * 100 / 128) >> 8 &0xFF # angular (in deg)
        self.lin_cmd = 0x100 - int(self.lin_cmd* self.invert_factor * 32767 * 100 / 128) >> 8 &0xFF # linear


    def socket_send(self, socket_send_txt):
        try:
            self.ip_socket.send(socket_send_txt.encode())
        except IOError as e:
            if '[Errno 32]' in str(e):  #Errno 32 = Broken pipe  ie. client dropped
                rospy.logwarn('Client dropped connection')
            if '[Errno 104]' in str(e): #Errno 104 = connection reset
                        rospy.logwarn('Destination port reset by client.')

    def dec2hex(self, dec, hexlen):
        """
        Convert dec to hex with leading 0s and no '0x'
        """
        h=hex(int(dec))[2:]
        l=len(h)

        if h[l-1]=="L":
            l-=1  #strip the 'L' that python int sticks on
        if h[l-2]=="x":
            h= '0'+hex(int(dec))[1:]

        return ('0'*hexlen+h)[l:l+hexlen]

if __name__ == "__main__":

    rospy.sleep(0.5)

    rospy.init_node('robot_interface', anonymous=True)

    rmv = rmv_ros_simple(os.getenv("RNET_PI_IP"), os.getenv("RNET_PI_PORT"))

    try:
        rmv.run()
    except KeyboardInterrupt:
        rmv.shutdown()
        rospy.loginfo("CAN disconnected")
        rospy.loginfo("Connection Off")
        rospy.loginfo("Socket down")
