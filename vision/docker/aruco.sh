#!/bin/bash

source /opt/ros/noetic/setup.bash
source /opt/ros_ws/devel/setup.bash
export ROS_IP=192.168.50.102
export ROS_MASTER_URI=http://192.168.50.101:11311
roslaunch aruco_ros single.launch
