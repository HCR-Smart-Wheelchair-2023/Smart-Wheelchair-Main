#!/usr/bin/env python3
import rospy
import tf2_ros
from sensor_msgs.msg import PointCloud2
from sensor_msgs.msg import LaserScan
from sensor_msgs import point_cloud2 as pc2
import math


# NUM_ANGLES = 10
# ANGLE_MIN = -1.57
# ANGLE_MAX = 1.57
# ANGLE_INCREMENT = (ANGLE_MAX-ANGLE_MIN) / NUM_ANGLES
def pointcloud_to_laserscan(pointcloud_msg):
    # Create a new LaserScan message
    laserscan_msg = LaserScan()

    # Set the header information of the LaserScan message
    laserscan_msg.header = pointcloud_msg.header
    laserscan_msg.angle_min = -math.pi/2
    laserscan_msg.angle_max = math.pi/2
    laserscan_msg.angle_increment = math.pi / 180
    laserscan_msg.time_increment = 0.0
    laserscan_msg.scan_time = 1.0 / 10.0  # 10 Hz
    laserscan_msg.range_min = 0.0
    laserscan_msg.range_max = 100.0

    # Convert the point cloud to a list of tuples
    pointcloud = pc2.read_points(pointcloud_msg, field_names=("x", "y", "z"))
    pointcloud_list = list(pointcloud)

    # Calculate the distances and intensities for each laser beam
    ranges = []
    intensities = []
    for angle in range(-90, 91):
        angle_rad = math.radians(angle)
        min_dist = laserscan_msg.range_max
        for point in pointcloud_list:
            x = point[0]
            y = point[1]
            z = point[2]
            dist = math.sqrt(x**2 + y**2 + z**2)
            if abs(math.atan2(y, x) - angle_rad) < laserscan_msg.angle_increment / 2:
                if dist < min_dist:
                    min_dist = dist
        if min_dist < laserscan_msg.range_max:
            ranges.append(min_dist)
            intensities.append(1.0)
        else:
            ranges.append(float('inf'))
            intensities.append(0.0)

    # Set the ranges and intensities for the LaserScan message
    laserscan_msg.ranges = ranges
    laserscan_msg.intensities = intensities

    return laserscan_msg




# Initialize ROS node
rospy.init_node('camera_to_map_transform')
sim = rospy.get_param("mode") == 'sim'
# Create a TransformListener
tfBuffer = tf2_ros.Buffer()
listener = tf2_ros.TransformListener(tfBuffer)

# Define the input and output frames
camera_frame = 'camera_link'
map_frame = 'map'

# Define a callback function for the point cloud subscriber
def callback(point_cloud_msg: PointCloud2):
    transformed_cloud = point_cloud_msg
    transformed_cloud.header.frame_id = camera_frame
    pub.publish(transformed_cloud)
    # pub_laser.publish(pointcloud_to_laserscan(transformed_cloud))
    # create laser scan data
    ANGLE_MIN = -1.57
    ANGLE_MAX = 1.57
    ANGLE_INCREMENT = 0
    TIME_INCREMENT = 0
    SCAN_TIME = 0
    RANGE_MIN = 0
    RANGE_MAX = 0
    ranges = []
    intensities = []

# Subscribe to the point cloud topic
topic = '/camera/depth/points' if sim else '/zed2i/zed_node/point_cloud/cloud_registered'
sub = rospy.Subscriber(topic, PointCloud2, callback)
# Create a publisher for the transformed point cloud
pub = rospy.Publisher('cloud', PointCloud2, queue_size=10)
pub_laser = rospy.Publisher('scan', LaserScan, queue_size=10)

# Spin the node
rospy.spin()
