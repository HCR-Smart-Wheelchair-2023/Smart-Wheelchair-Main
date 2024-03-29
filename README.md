# Information

This repository contains the basic setup needed to be able to drive the wheelchair. Currently only a `/cmd_vel` ROS topic is setup from which a subscriber sends commands to the Raspberry Pi to move the robot.


</br>

## Running on wheel chair (13/03/2023)

1. Power wheelchair on
2. Start roscore 
```bash
cd ~/wheelchair
make run-external-core
```
3. Start up zed (Note: this will take approx 10mins due to object detection)
```bash
cd ~/wheelchair_zed/Smart-Wheelchair-Main
make run-jetson
```
4. Launch robot main
```bash
cd ~/wheelchair
make run-external-main
```

</br>

## RNET Wheelchair base setup

- Clone the repository
```bash
git clone https://github.com/max-wickham/rnet-wheelchair-docker.git

```

- Copy the env file and set the correct IP addresses
```bash
cp .env.example .env
vim .env
```

- If using the robot not simulation set the MODE environment variable to 'robot'

### On the Raspberry PI

- SSH into the PI with user "hpr" and then run the following to start the server.

- TODO this start shell script still needs to be made, currently the PI is started using a python script in a directory I can't remember. Eventually this should be set up as a make command that SSHs into the PI and starts this script. (Potentially this could be part of the start up sequence of the script that communicates with the PI?)

```bash
./start
```

### On the main computer

Build the docker image:
```bash
make build-external
```
Run the docker image to start ros core
```bash
make run-external-core
```
To launch the main ros program, (requires the above command to be running)
```bash
make run-external-main
```
To access a terminal in laptop core ros container
```bash
make run-external-bash
```

### Driving the Robot

- Once `make run-external-core` and `make run-external-main` are running it should be possible to publish to the `/cmd_vel` ROS topic to drive the robot


</br>

## Launching the simulation

First, checkout to the `simulation` git branch.

Then, if not already done, install the required ROS packages:
```
sudo apt-get install ros-noetic-ros-control ros-noetic-ros-controllers
```

Now, you can start the simulation (world, model, controllers and actors) with the following command:
```
roslaunch robot_main robot_main_external.launch --screen
```

</br>
</br>
</br>

## Misc. development notes


- Set the odom-base_link from the odom topic for the zed
- Set the map-odom to make the map-base equal pose from pose topic

- Set up a topic that allows setting of the current pose


- PI  prl@192.168.50.100 password: HCRrnet1
- Orin prl@192.168.50.102 password: prl

Laptop
make run-external core
make run-external-main

Orin Intruction (First start roscore on laptop)
cd human....
sudo ./start_docker....
./start.sh






<!--
    <node name="rtabmap" pkg="rtabmap_ros" type="rtabmap" output="screen" args="--delete_db_on_start">
        <param name="frame_id" type="string" value="base_link"/>

        <param name="subscribe_depth" type="bool" value="false"/>
        <param name="subscribe_rgbd" type="bool" value="false"/>
        <param name="subscribe_scan" type="bool" value="true"/>

        <remap from="odom" to="/odom"/>
        <remap from="scan" to="/scan"/>
        <!-- <remap from="rgbd_image" to="rgbd_image"/> -->

        <param name="queue_size" type="int" value="10"/>

        <!-- RTAB-Map's parameters -->
        <!-- <param name="RGBD/NeighborLinkRefining" type="string" value="true"/>
        <param name="RGBD/ProximityBySpace"     type="string" value="true"/>
        <param name="RGBD/AngularUpdate"        type="string" value="0.01"/>
        <param name="RGBD/LinearUpdate"         type="string" value="0.01"/>
        <param name="RGBD/OptimizeFromGraphEnd" type="string" value="false"/> -->
        <param name="Grid/FromDepth"            type="string" value="false"/> <!-- occupancy grid from lidar -->
        <param name="Reg/Force3DoF"             type="string" value="true"/>
        <param name="Reg/Strategy"              type="string" value="1"/> <!-- 1=ICP -->

        <!-- ICP parameters -->
        <param name="Icp/VoxelSize"                 type="string" value="0.05"/>
        <param name="Icp/MaxCorrespondenceDistance" type="string" value="0.1"/>
    </node>
-->
