cmake_minimum_required(VERSION 3.0.2)

project(emotion_detection)

## Find catkin macros and libraries
## if COMPONENTS list like find_package(catkin REQUIRED COMPONENTS xyz)
## is used, also find other catkin packages
find_package(catkin REQUIRED COMPONENTS
  rospy
  sensor_msgs
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
#############scripts/deepface_script.py deepface_ui.py
catkin_install_python(PROGRAMS scripts/cam_pub.py
  DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION})
catkin_install_python(PROGRAMS scripts/deepface_script.py
  DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION})
# catkin_install_python(PROGRAMS scripts/deepface_ui.py
#   DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION})
