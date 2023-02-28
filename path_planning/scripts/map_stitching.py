#!/usr/bin/env python

import rospy
import numpy as np
from nav_msgs.msg import OccupancyGrid

class MapStitcher:
    def __init__(self):
        self.known_position = True
        rospy.init_node('map_stitcher')
        self.dynamic_map = None
        self.static_map_array = None
        self.sub1 = rospy.Subscriber('/staticmap', OccupancyGrid, self.static_map_callback)
        self.sub2 = rospy.Subscriber('/map', OccupancyGrid, self.dynamic_map_callback)
        self.pub = rospy.Publisher('/merged_map', OccupancyGrid, queue_size=1)
        rospy.spin()

    def static_map_callback(self, map_data):
        if self.dynamic_map is not None:
            self.static_map_array = np.array(map_data.data)
            self.static_map_array.reshape((map_data.info.height, map_data.info.width))
            padding = max(int(map_data.info.height - self.dynamic_map.info.height), 0)
            self.static_map_array = np.pad(self.static_map_array, pad_width=padding, mode='constant', constant_values=0)
            self.static_map_array = self.static_map_array.reshape(
                (self.static_map_array.shape[0]*self.static_map_array.shape[1])
            )

    def dynamic_map_callback(self, map_data):
        self.dynamic_map = map_data
        if self.known_position and self.static_map_array is not None:
            self.merge_maps()
        self.pub.publish(self.dynamic_map)

    def merge_maps(self):
        map_array = np.array(self.dynamic_map.data)
        map_array = np.add(self.static_map_array, map_array)
        self.dynamic_map.data = map_array

if __name__ == '__main__':
    MapStitcher()
