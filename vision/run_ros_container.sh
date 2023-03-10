#!/bin/bash

source .env

xhost +

docker run --privileged --rm --gpus all --runtime nvidia -it --net=host -e DISPLAY=$DISPLAY -e ROS_IP=192.168.50.101 -e ROS_MASTER_URI=http://192.168.50.101:11311 --ipc=host -v /tmp/.X11-unix/:/tmp/.X11-unix/ -v /tmp/argus_socket:/tmp/argus_socket ${TAG_STAGE_2}
