#!/bin/bash

source .env

xhost +

docker stop zed_container || true

docker start zed_container
docker exec -e DISPLAY=$DISPLAY -e ROS_IP=192.168.50.101 -e ROS_MASTER_URI=http://192.168.50.101:11311 -i zed_container bash -c "/start.sh"

docker stop zed_container