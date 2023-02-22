include .env
export $(shell sed 's/=.*//' .env)
current_dir = $(shell pwd)

JOYSTICK = "with_joystick"

build-external:
	DOCKER_BUILDKIT=1 docker build -t amiga_base_external:latest -f Dockerfile.external .

build-jetson:
	DOCKER_BUILDKIT=1 docker build -t jetson_base:latest -f Dockerfile.jetson .

run-jetson:
	docker run \
		-it \
		--name jetson \
		--gpus all \
		jetson_base:latest


run-jetson-core:
	xhost +si:localuser:root
	docker stop external || true && docker rm external || true
	docker run \
		-e "DISPLAY" \
		-e "QT_X11_NO_MITSHM=1" \
		-e "XAUTHORITY=${XAUTH}" \
		-e ROS_MASTER_URI="http://${RNET_JETSON_BASE_IP}:11311" \
		-e ROS_IP="${RNET_COMPUTER_IP}" \
		-e RNET_PI_IP=${RNET_PI_IP} \
		-e RNET_PI_PORT=${RNET_PI_PORT} \
		-v ~/.Xauthority:/root/.Xauthority:rw \
		-v "/tmp/.X11-unix:/tmp/.X11-unix:rw" \
		-v /tmp/.docker.xauth:/tmp/.docker.xauth \
		-v $(current_dir)/robot_main/:/root/ros_ws/src/robot_main \
		-v $(current_dir)/navigation/:/root/ros_ws/src/navigation \
	    --privileged \
		--network host \
		--name jetson \
		--gpus all \
		-it \
		jetson_base:latest

run-external-core:
	xhost +si:localuser:root
	docker stop external || true && docker rm external || true
	docker run \
		-e "DISPLAY" \
		-e "QT_X11_NO_MITSHM=1" \
		-e "XAUTHORITY=${XAUTH}" \
		-e ROS_MASTER_URI="http://${RNET_COMPUTER_IP}:11311" \
		-e ROS_IP="${RNET_COMPUTER_IP}" \
		-e "MODE=robot" \
		-e RNET_PI_IP=${RNET_PI_IP} \
		-e RNET_PI_PORT=${RNET_PI_PORT} \
		-v ~/.Xauthority:/root/.Xauthority:rw \
		-v "/tmp/.X11-unix:/tmp/.X11-unix:rw" \
		-v /tmp/.docker.xauth:/tmp/.docker.xauth \
		-v $(current_dir)/robot_main/:/root/ros_ws/src/robot_main \
		-v $(current_dir)/navigation/:/root/ros_ws/src/navigation \
		-v $(current_dir)/user_interface/:/root/ros_ws/src/user_interface \
		-v $(current_dir)/path_planning/:/root/ros_ws/src/path_planning \
		-v $(current_dir)/emotion/:/root/ros_ws/src/emotion \
	    --privileged \
		--network host \
		--name external \
		--gpus all \
		-it \
		amiga_base_external:latest

run-external-bash:
	docker exec -it external bash -c "cd /root/ros_ws/src && \
		source /opt/ros/noetic/setup.bash && \
		source ../devel/setup.bash && \
		bash"

run-jetson-bash:
	docker exec -it reverent_sinoussi bash -c "cd /root/ros_ws/src && \
		source /opt/ros/noetic/setup.bash && \
		source ../devel/setup.bash && \
		bash"

run-external-main:
	docker exec -it external bash -c "cd /root/ros_ws/src && \
		source /opt/ros/noetic/setup.bash && \
		source ../devel/setup.bash && \
		export ROS_IP=192.168.50.101 && \
		export ROS_MASTER_URI=http://192.168.50.101:11311 && \
		rosservice call /zed/reset_odometry && \
		roslaunch robot_main robot_main_external.launch --screen"

topic-list:
	ROS_MASTER_URI="http://${RNET_COMPUTER_IP}:11311" rostopic list

reset-zed-odom:
	ROS_MASTER_URI="http://${RNET_COMPUTER_IP}:11311" rosservice call /zed/reset_odometry

build-sim:
	DOCKER_BUILDKIT=1 docker build -t sim:latest \
	-f Dockerfile.sim .


run-sim-core:
	xhost +si:localuser:root
	docker stop sim || true && docker rm sim || true
	docker run \
		-e "DISPLAY" \
		-e "QT_X11_NO_MITSHM=1" \
		-e "XAUTHORITY=${XAUTH}" \
		-e "MODE=sim" \
		-v ~/.Xauthority:/root/.Xauthority:rw \
		-v "/tmp/.X11-unix:/tmp/.X11-unix:rw" \
		-v /tmp/.docker.xauth:/tmp/.docker.xauth \
		-v $(current_dir)/robot_main/:/root/ros_ws/src/robot_main \
		-v $(current_dir)/navigation/:/root/ros_ws/src/navigation \
		-v $(current_dir)/user_interface/:/root/ros_ws/src/user_interface \
		-v $(current_dir)/path_planning/:/root/ros_ws/src/path_planning \
		-v $(current_dir)/emotion/:/root/ros_ws/src/emotion \
		-v $(current_dir)/wheele_description/:/root/ros_ws/src/wheele_description \
		-v $(current_dir)/room_description/:/root/ros_ws/src/room_description \
		-v $(current_dir)/wheele_gazebo/:/root/ros_ws/src/wheele_gazebo \
	    --privileged \
		--network host \
		--name sim \
		-it \
		sim

run-sim-main:
	docker exec -it sim bash -c "cd /root/ros_ws/src && \
		source /opt/ros/noetic/setup.bash && \
		source ../devel/setup.bash && \
		roslaunch robot_main robot_main_external.launch --screen"

run-sim-bash:
	docker exec -it sim bash -c "cd /root/ros_ws/src && \
		source /opt/ros/noetic/setup.bash && \
		source ../devel/setup.bash && \
		bash"
