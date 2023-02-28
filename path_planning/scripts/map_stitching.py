#!/usr/bin/env python

import rospy
import numpy as np
from math import ceil
from nav_msgs.msg import OccupancyGrid

class MapStitcher:
    def __init__(self):
        self.known_position = True
        rospy.init_node('map_stitcher')
        self.dynamic_map = None
        self.static_map_array = None
        self.sub1 = rospy.Subscriber('/staticmap', OccupancyGrid, self.static_map_callback)
        self.sub2 = rospy.Subscriber('/zed/grid_prob_map', OccupancyGrid, self.dynamic_map_callback)
        self.pub = rospy.Publisher('/merged_map', OccupancyGrid, queue_size=1)
        rospy.spin()

    def static_map_callback(self, map_data):
        self.static_map = map_data
        self.static_array = np.array(self.static_map.data).reshape((self.static_map.info.width,self.static_map.info.height))


    def dynamic_map_callback(self, map_data):
        self.dynamic_map = map_data
        if self.known_position and self.static_map is not None:
            self.merge_maps()
        # self.pub.publish(self.dynamic_map)

    def merge_maps(self):
        map_array = np.array(self.dynamic_map.data)
        # map_array = np.add(self.static_map_array, map_array)
        # self.dynamic_map.data = map_array
        map_array = map_array.reshape((self.dynamic_map.info.height, self.dynamic_map.info.width))
        static_array = self.static_array
        x_min = int(self.dynamic_map.info.origin.position.x - int(self.dynamic_map.info.height/2))
        x_max = int(self.dynamic_map.info.origin.position.x + ceil(self.dynamic_map.info.height/2))
        y_min = int(self.dynamic_map.info.origin.position.y - int(self.dynamic_map.info.width/2))
        y_max = int(self.dynamic_map.info.origin.position.y + ceil(self.dynamic_map.info.width/2))
        rospy.loginfo(f'{x_min},{x_min},{y_min},{y_max},{self.dynamic_map.info.height}')
        static_array[x_min:x_max,y_min:y_max] += map_array
        static_array = static_array.reshape(self.static_map.info.width*self.static_map.info.height)
        self.static_map.data = static_array
        self.pub.publish(self.static_map)

        # map_array = np.pad(map_array, pad_width=((int(self.dynamic_map))))
        # self.static_map_array.reshape((map_data.info.height, map_data.info.width))
        #     padding = max(int(map_data.info.height - self.dynamic_map.info.height), 0)
        #     self.static_map_array = np.pad(self.static_map_array, pad_width=padding, mode='constant', constant_values=0)
        #     self.static_map_array = self.static_map_array.reshape(
        #         (self.static_map_array.shape[0]*self.static_map_array.shape[1])
        #     )

if __name__ == '__main__':
    MapStitcher()
