# human-centered-robotics-vision

The following steps are required to use the camera.

Before starting, check this:
- [ ] The camera is connected to the Jetson
- [ ] The Jetson has got an ethernet connection to the router
- [ ] The Jetson and Laptop are powered on

### Starting the ZED2i ROS Node

```bash
# To build the docker image for vision (do this once)
make build-jetson

# To run the docker vision container
# Sometimes this needs multiple attempts to work
make run-jetson
```

### Perception / Vision Topics

The following topics are published by the ZED2i ROS node:

- `/zedA/...` - PRIMARY CAMERA, All the topics of the Zed 2i camera (includes the rtabmap topics, like occupancy grid)
- `/zedB/...` - SECONDARY CAMERA, All the topics of the Zed Mini camera