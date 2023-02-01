include .env
export $(shell sed 's/=.*//' .env)
current_dir = $(shell pwd)

JOYSTICK = "with_joystick"

build-jetson-kernel:
	cd librealsense && DEBIAN_FRONTEND=noninteractive ./scripts/patch-realsense-ubuntu-L4T.sh

build-jetson:
	docker build -t prl_rnet_jetson_noetic:latest -f Dockerfile.jetson20 .

build-pi:
	DOCKER_BUILDKIT=1 docker build -t prl_rnet_pi:latest -f Dockerfile.pi .

build-external:
	DOCKER_BUILDKIT=1 docker build -t amiga_base_external:latest -f Dockerfile.external .


run-jetson:
	docker stop rnet_base || true && docker rm rnet_base || true
	docker run \
		-e ROS_IP=${RNET_JETSON_BASE_IP} \
		-e ROS_MASTER_URI="http://${RNET_COMPUTER_IP}:11311" \
		-e RNET_ROBOT=${RNET_ROBOT} \
		-e RNET_PI_IP=${RNET_PI_IP} \
		-e RNET_PI_PORT=${RNET_PI_PORT} \
		-e RNET_ROSCORE=${RNET_ROSCORE} \
		-e RNET_RUN_SLAM_ON=${RNET_RUN_SLAM_ON} \
		-e RNET_SLAM_MODE=${RNET_SLAM_MODE} \
		-e RNET_ODOM=${RNET_ODOM} \
		-e RNET_RTABMAP_ARNIE_LOC_DB_PATH=${RNET_RTABMAP_ARNIE_LOC_DB_PATH} \
		-e RNET_JOYSTICK=${RNET_JOYSTICK} \
		-e RNET_MOVE_BASE=${RNET_MOVE_BASE} \
		-e LD_PRELOAD=/usr/lib/aarch64-linux-gnu/libgomp.so.1 \
		-v /dev:/dev \
		-v $(current_dir)/arnie_navigation/:/root/ros_ws/src/arnie_navigation/ \
		-v $(current_dir)/arnie_localisation/:/root/ros_ws/src/arnie_localisation/ \
		-v $(current_dir)/arnie_main/:/root/ros_ws/src/arnie_main \
		-v $(current_dir)/arnie_description/:/root/ros_ws/src/arnie_description \
	    --privileged \
		--network host \
		--name rnet_base \
		--gpus all \
		-t \
		prl_rnet_jetson_noetic:latest


run-external-core:
	xhost +si:localuser:root
	docker stop arnie_external || true && docker rm arnie_external || true
	docker run \
		-e "DISPLAY" \
		-e "QT_X11_NO_MITSHM=1" \
		-e "XAUTHORITY=${XAUTH}" \
		-e ROS_MASTER_URI="http://${RNET_COMPUTER_IP}:11311" \
		-e ROS_IP="${RNET_COMPUTER_IP}" \
		-e RNET_JOYSTICK=${RNET_JOYSTICK} \
		-e RNET_MAPPING=${RNET_MAPPING} \
		-e RNET_ROSCORE=${RNET_ROSCORE} \
		-e RNET_PI_IP=${RNET_PI_IP} \
		-e RNET_PI_PORT=${RNET_PI_PORT} \
		-e RNET_ROBOT=${RNET_ROBOT} \
		-v ~/.Xauthority:/root/.Xauthority:rw \
		-v "/tmp/.X11-unix:/tmp/.X11-unix:rw" \
		-v /tmp/.docker.xauth:/tmp/.docker.xauth \
		-v $(current_dir)/arnie_main/:/root/ros_ws/src/arnie_main \
		-v $(current_dir)/arnie_description/:/root/ros_ws/src/arnie_description \
		-v $(current_dir)/arnie_localisation/:/root/ros_ws/src/arnie_localisation \
		-v $(current_dir)/arnie_navigation/:/root/ros_ws/src/arnie_navigation \
	    --privileged \
		--network host \
		--name arnie_external \
		--gpus all \
		-it \
		amiga_base_external:latest

run-external-main:
	docker exec -it 2f80c9f379a8 bash -c "cd /root/ros_ws/src && \
		source /opt/ros/noetic/setup.bash && \
		source ../devel/setup.bash && \
		roslaunch arnie_main main_external.launch --screen"
		
run-external-bash:
	docker exec -it 2f80c9f379a8 bash -c "cd /root/ros_ws/src && \
		source /opt/ros/noetic/setup.bash && \
		source ../devel/setup.bash && \
		bash"

run-pi:
	docker stop can2rnet || true && docker rm can2rnet || true
	docker run \
		-d \
		--restart always \
		--network host \
		-v /dev/input:/dev/input \
		--privileged \
		--name can2rnet \
		prl_rnet_pi:latest

restart-jetson:
	ssh pi@${RNET_PI_IP} "cd rnet-wheelchair-docker && make run-pi"
	ssh -X ${RNET_JETSON_BASE_USER}@${RNET_JETSON_BASE_IP} "cd rnet-wheelchair-docker && make run-jetson"

topic-list:
	ROS_MASTER_URI="http://${RNET_COMPUTER_IP}:11311" rostopic list


stop-jetson:
	ssh -X ${RNET_JETSON_BASE_USER}@${RNET_JETSON_BASE_IP} "docker container stop rnet_base"
