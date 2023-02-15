#!/bin/bash
set -e
source .env

echo "Building '${TAG_STAGE_1}'"

docker build --build-arg ZED_SDK_MAJOR=${ZED_SDK_MAJOR} \
--build-arg ZED_SDK_MINOR=${ZED_SDK_MINOR} \
--build-arg L4T_MAJOR_VERSION=${L4T_MAJOR_VERSION} \
--build-arg L4T_MINOR_VERSION=${L4T_MINOR_VERSION} \
--build-arg ROS_DISTRO_ARG=${ROS_DISTRO_ARG} \
-t "${TAG_STAGE_1}" -f "${DOCKERFILE_STAGE_1}" .

echo "Building '${TAG_STAGE_2}'"

docker build --build-arg BASE_IMAGE="${TAG_STAGE_1}" -t "${TAG_STAGE_2}" -f "${DOCKERFILE_STAGE_2}" .