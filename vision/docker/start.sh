#!/bin/bash

source /opt/ros/noetic/setup.bash
source /opt/ros_ws/devel/setup.bash
export ROS_IP=192.168.50.102
export ROS_MASTER_URI=http://192.168.50.101:11311
#roslaunch zed_wrapper zed2i.launch
#apt-get install --fix-missing -y ros-noetic-aruco-ros
#./aruco.sh &
roslaunch zed_rtab_two_cameras zed_rtabmap.launch
