# human-centered-robotics-vision

Follow these steps.

- [ ] Wheelchair, laptop and Jetson all powered off
- [ ] Make sure the zed 2i and blue ethernet is plugged into Jetson (never unplug or change anything without speaking to Vision Team!)
- [ ] Plug in the Ethernet Cable to the Wall and ensure it is connected to the Router
- [ ] Disable the Emergency Button
- [ ] Plug in the cable that power jetson, router and arduino, ensure lights turn on
- [ ] Turn the Wheelchair on
- [ ] Turn the Laptop On, wait for Laptop to Boot up
- [ ] On the laptop run the following: 
```bash
cd wheelchair/

# First terminal window
make run-external-core # wait for the core to load

# Second terminal window
# Optional: make build-jetson # pass is prl
make run-jetson # pass is prl

# 3rd Terminal Window
make run-external-bash
# Inside the docker container
rviz # See the RTAPMap and zed topics

```

### Connecting the Zed2i and ZedM (Beta)
A launchfile exists that runs both cameras and publishes odometry topics for both and also publishes the rtabmap which is based on a single camera only

Change the start.sh file to run `roslaunch zed_multicamera_example_with_rtabmap zed_multi_cam.launch`

```bash
# To build the docker image for vision (do this once)
make build-jetson

# To run the docker vision container
# Sometimes this needs multiple attempts to work
make run-jetson
```

#### Perception / Vision Topics for 2 Cameras

The following topics are published by the ZED2i ROS node:

- `/zedA/...` - PRIMARY CAMERA, All the topics of the Zed 2i camera (includes the rtabmap topics, like occupancy grid)
- `/zedB/...` - SECONDARY CAMERA, All the topics of the Zed Mini camera