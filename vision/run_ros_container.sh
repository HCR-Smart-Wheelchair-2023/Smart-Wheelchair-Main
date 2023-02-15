#!/bin/bash

source .env

xhost +

docker run --privileged --rm --gpus all --runtime nvidia -it --net=host -e DISPLAY=$DISPLAY --ipc=host -v /tmp/.X11-unix/:/tmp/.X11-unix/ -v /tmp/argus_socket:/tmp/argus_socket ${TAG_STAGE_2}