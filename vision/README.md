# human-centered-robotics-vision

The following steps are required to use the camera.

Before starting, check this:
- [ ] The camera is connected to the Jetson
- [ ] The Jetson has got an ethernet connection to the router
- [ ] The Jetson and Laptop are powered on

### Starting the ZED2i ROS Node

```bash
# On the laptop

# Otherwise get the IP address by connecting a screen to the Jetson.
# IP likely is 192.168.50.102
ssh <ip address of jetson> -X 
# user prl; password prl

cd human-centered-robotics-vision/
./run_ros_container.sh  # Start the docker container

# Inside the container
source /opt/ros/noetic/setup.bash
source /opt/ros_ws/devel/setup.bash

roslaunch zed_wrapper zed2i.launch

# The zed2i camera should now run and the ros node should publish the data via ros topics
```
