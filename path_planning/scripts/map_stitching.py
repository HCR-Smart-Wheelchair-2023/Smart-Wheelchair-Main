#!/usr/bin/env python

import rospy
import numpy as np
from math import ceil
from nav_msgs.msg import OccupancyGrid

RESOLUTION = 0.05

class MapStitcher:
    def __init__(self):
        self.known_position = True
        rospy.init_node('map_stitcher')
        self.dynamic_map = None
        self.static_map_array = None
        self.sub1 = rospy.Subscriber('/staticmap', OccupancyGrid, self.static_map_callback)
        self.sub2 = rospy.Subscriber('/zed/map', OccupancyGrid, self.dynamic_map_callback)
        self.pub = rospy.Publisher('/merged_map', OccupancyGrid, queue_size=1)
        rospy.spin()

    def static_map_callback(self, map_data):
        self.static_map = map_data
        self.static_array = np.array(self.static_map.data).reshape((self.static_map.info.width,self.static_map.info.height))


    def dynamic_map_callback(self, map_data):
        self.dynamic_map = map_data
        rospy.loginfo(f'received maps')
        if self.known_position and self.static_map is not None:
            rospy.loginfo(f'merging')
            self.merge_maps()
        # self.pub.publish(self.dynamic_map)

    def merge_maps(self):
        map_array = np.array(self.dynamic_map.data)
        # map_array = np.add(self.static_map_array, map_array)
        # self.dynamic_map.data = map_array
        map_array = map_array.reshape((self.dynamic_map.info.height, self.dynamic_map.info.width))
        # resolution = self.dynamic_map.data.info.resolution
        # rospy.loginfo(str(self.dynamic_map.origin))
        rospy.loginfo(str(self.dynamic_map.info))
        # rospy.loginfo(f'resolution {resolution}')
        # if resolution != RESOLUTION:
        #     rospy.loginfo(f'resolution {resolution}')



        static_array = self.static_array
        # x_min = int(self.dynamic_map.info.origin.position.x - int(self.dynamic_map.info.height/2))
        # x_max = int(self.dynamic_map.info.origin.position.x + ceil(self.dynamic_map.info.height/2))
        # y_min = int(self.dynamic_map.info.origin.position.y - int(self.dynamic_map.info.width/2))
        # y_max = int(self.dynamic_map.info.origin.position.y + ceil(self.dynamic_map.info.width/2))
        # x_min = int(float(self.dynamic_map.info.origin.position.x + 0.9) / 0.05)
        # x_max = int(float(self.dynamic_map.info.origin.position.x + 0.9) / 0.05 + self.dynamic_map.info.height)
        # y_min = int(float(self.dynamic_map.info.origin.position.y - 0.9) / 0.05)
        # y_max = int(float(self.dynamic_map.info.origin.position.y - 0.9) / 0.05 + self.dynamic_map.info.width)
        x_min = int(float(self.dynamic_map.info.origin.position.y) / 0.05)
        x_max = int(float(self.dynamic_map.info.origin.position.y) / 0.05 + self.dynamic_map.info.height)
        y_min = int(float(self.dynamic_map.info.origin.position.x) / 0.05)
        y_max = int(float(self.dynamic_map.info.origin.position.x) / 0.05 + self.dynamic_map.info.width)


        rospy.loginfo(f'{x_min},{x_max},{y_min},{y_max},{self.dynamic_map.info.height}')
        x_offset = (x_max-x_min) - map_array.shape[0]
        y_offset = (y_max-y_min) - map_array.shape[1]

        static_array = np.vectorize(lambda x : 255 - x)(static_array)
        map_array = np.vectorize(lambda x : 255 - x)(map_array)
        static_array[(x_min+500+x_offset):(x_max+500),(y_min+500+y_offset):(y_max+500)] += map_array
        static_array = static_array.reshape(self.static_map.info.width*self.static_map.info.height)
        static_array = np.vectorize(lambda x : 255 if x < 100 else 0)(static_array)
        self.static_map.data = np.clip(static_array,0,255)
        self.pub.publish(self.static_map)
        rospy.loginfo(f'published')
        # map_array = np.pad(map_array, pad_width=((int(self.dynamic_map))))
        # self.static_map_array.reshape((map_data.info.height, map_data.info.width))
        #     padding = max(int(map_data.info.height - self.dynamic_map.info.height), 0)
        #     self.static_map_array = np.pad(self.static_map_array, pad_width=padding, mode='constant', constant_values=0)
        #     self.static_map_array = self.static_map_array.reshape(
        #         (self.static_map_array.shape[0]*self.static_map_array.shape[1])
        #     )

if __name__ == '__main__':
    MapStitcher()
