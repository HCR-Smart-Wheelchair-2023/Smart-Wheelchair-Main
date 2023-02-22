cmake_minimum_required(VERSION 3.0.2)

project(user_interface)

## Find catkin macros and libraries
## if COMPONENTS list like find_package(catkin REQUIRED COMPONENTS xyz)
## is used, also find other catkin packages
find_package(catkin REQUIRED COMPONENTS
  rospy
  geometry_msgs
  std_msgs
  roslaunch
)
#roslaunch_add_file_check(launch)

###################################
## catkin specific configuration ##
###################################

catkin_package()

###########
## Build ##
###########

include_directories(
  ${catkin_INCLUDE_DIRS}
)

#############
## Install ##
#############
catkin_install_python(PROGRAMS scripts/connect.py
  DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION})
