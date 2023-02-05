# Project Structure

This file documents the different tasks in the project as well as a description of the ros topics and their accompanying data flow.

## Frame

The "tf" ros package is used to maintain a coordinate frame of the robot and can be used to convert coordinates from one frame to another easily.

- The frame linkages must be sent to the /tf topic on startup

Frames --> "/tf"

## Mapping

Mapping can make use of cameras or lidar to build a model of the robots environment, this may require odometry or implement the odometry itself

- Data from the sensors should be transformed to be relative to the base linkage and sent to the "/scan" topic
- The data from the "/odometry", "/tf", and "/scan" frames can be used to map the environment, with the resulting map data published to "/map"


("/odometry", "/tf", "/scan") --> "/map"

## Obstacle Avoidance and Path Planning

The obstacle avoidance system requires a goal position relative to the robot odometry and a map of the environment. It can then output commands to the "/cmd_vel" topic to drive the robot

("/map", "/goal", "/odometry") --> "/cmd_vel"

## Goal Detection

The camera system should be able to detect objects in the environment relative to the robot. This combined with data from the user can be used to calculate and publish the goal position. Humans should also be detected an this information with eventually be used to improve obstacle avoidance based on human interaction.
