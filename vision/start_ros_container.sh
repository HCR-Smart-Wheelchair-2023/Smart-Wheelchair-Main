#!/bin/bash

source .env

xhost +

docker stop zed_container || true
docker start zed_container

docker exec -e DISPLAY=$DISPLAY -e ROS_IP=192.168.50.101 -e ROS_MASTER_URI=http://192.168.50.101:11311 --ipc=host -v /tmp/.X11-unix/:/tmp/.X11-unix/ -v /tmp/argus_socket:/tmp/argus_socket -it zed_container bash
