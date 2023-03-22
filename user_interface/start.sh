#! /bin/bash
source /opt/ros/noetic/setup.bash
catkin init
catkin build
source ./devel/setup.bash

cd src/user_interface/scripts
python3 connect.py 2> /dev/null &
echo "Running Stuff"
rosrun user_interface get_goal.py &
cd ../../emotion_detection/scripts
echo "Running Stuff"
rosrun emotion_detection deepface_ui.py
echo "Running Stuff"
# cd .. && source /opt/ros/noetic/setup.bash && catkin init && catkin build && source ./devel/setup.bash && bash
