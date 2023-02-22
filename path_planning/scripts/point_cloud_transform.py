#!/usr/bin/env python3
import rospy
import tf2_ros
import tf2_geometry_msgs
import sensor_msgs.point_cloud2 as pc2
from tf2_sensor_msgs.tf2_sensor_msgs import do_transform_cloud
from sensor_msgs.msg import PointCloud2
import math
# Initialize ROS node
rospy.init_node('camera_to_map_transform')
sim = rospy.get_param("mode") == 'sim'
print('#######')
print(sim)
# Create a TransformListener
tfBuffer = tf2_ros.Buffer()
listener = tf2_ros.TransformListener(tfBuffer)

# Define the input and output frames
camera_frame = 'camera_link'
map_frame = 'map'

# Define a callback function for the point cloud subscriber
def callback(point_cloud_msg: PointCloud2):
    global sim
    # Wait for the transform to become available
    if sim:
        try:
            trans = tfBuffer.lookup_transform(map_frame, camera_frame, rospy.Time())
        except (tf2_ros.LookupException, tf2_ros.ConnectivityException, tf2_ros.ExtrapolationException) as e:
            rospy.logwarn('Failed to get transform: {}'.format(str(e)))
            return
        transformed_cloud = do_transform_cloud(point_cloud_msg, trans)
    else:
        transformed_cloud = point_cloud_msg
    print(transformed_cloud.header.frame_id)
    # print('Sending Message')
    transformed_cloud.header.frame_id = map_frame if sim else camera_framecamera
    pub.publish(transformed_cloud)

# Subscribe to the point cloud topic
# TODO change for zed2i
topic = '/camera/depth/points' if sim else '/zed2i/zed_node/point_cloud/cloud_registered'
sub = rospy.Subscriber(topic, PointCloud2, callback)
# Create a publisher for the transformed point cloud
pub = rospy.Publisher('cloud', PointCloud2, queue_size=10)

# Spin the node
rospy.spin()
