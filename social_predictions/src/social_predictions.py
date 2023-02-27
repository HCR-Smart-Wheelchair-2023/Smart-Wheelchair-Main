#!/usr/bin/env python
import rospy
import math
import numpy as np
import cv2

from people_msg.msg import People, Person
from zed_interfaces.msg import ObjectsStamped, Object
from nav_msgs.msg import OccupancyGrid
from std_msgs.msg import String
from geometry_msgs.msg import Point

def draw_Gaussian(costmap, object_pos):
    # Extract parameters from the occupancy grid message
    width = costmap.info.width
    height = costmap.info.height
    resolution = costmap.info.resolution
    origin_x = costmap.info.origin.position.x
    origin_y = costmap.info.origin.position.y

    # Convert the position to grid coordinates
    x = int(round((object_pos[0] - origin_x) / resolution))
    y = int(round((object_pos[1] - origin_y) / resolution))

    # Create a 2D Gaussian distribution centered at the specified point
    sigma = 10
    x_grid, y_grid = np.meshgrid(np.arange(width), np.arange(height))
    gaussian = np.exp(-((x_grid - x) ** 2 + (y_grid - y) ** 2) / (2 * sigma ** 2))

    # Multiply the Gaussian distribution by the occupancy grid
    new_data = np.array(costmap.data).reshape((height, width)) * gaussian

    return  new_data.flatten().tolist()



def social_predict(costmap, object_pos, velocity, t):
    # Convert the object position to grid coordinatesn
    grid_x = int((object_pos[0] - costmap.info.origin.position.x) / costmap.info.resolution)
    grid_y = int((object_pos[1] - costmap.info.origin.position.y) / costmap.info.resolution)

    # Calculate the number of cells the object will move in the next t seconds
    cells_to_move_x = int(math.ceil(abs(velocity[0]) * t / costmap.info.resolution))
    cells_to_move_y = int(math.ceil(abs(velocity[1]) * t / costmap.info.resolution))

    # determine the direction of the line
    x_step = 1 if velocity[0] > 0 else -1
    y_step = 1 if velocity[1] > 0 else -1

    # calculate the number of steps needed to traverse the line
    num_steps = max(cells_to_move_x, cells_to_move_y)

    # Create a list of cells that the object will occupy
    cells = []
    for i in range(num_steps):
        x = grid_x + round(i * cells_to_move_x / num_steps) * x_step
        y = grid_y + round(i * cells_to_move_y / num_steps) * y_step
        if x >= 0 and x < costmap.info.width and y >= 0 and y < costmap.info.height:
            idx = int(x + y * costmap.info.width)
            #if costmap.data[idx] == 0: # Cell is unoccupied
            cells.append(idx)

    return cells


class MapProcessor:
    def __init__(self):
        self.map_sub = rospy.Subscriber('/map', OccupancyGrid, self.map_callback_map, queue_size=1)
        self.update_sub = rospy.Subscriber('/zed2i/zed_node/obj_det/objects', ObjectsStamped, self.map_callback_update, queue_size=1)
        self.map_pub = rospy.Publisher('/adj_map', OccupancyGrid, queue_size=10)
        self.latest_map = None

    def map_callback_map(self, data):
        self.latest_map = data

    def map_callback_update(self, data):
        t = 5.0

        #predict for each detected object
        adjusted_cells = []
        for person in data.objects:
            adjusted_cells += social_predict(self.latest_map, person.position, person.velocity, t)
        
        

        # object_pos1 = Point(1.0, 2.0, 0.0)
        # adjusted_cells = draw_Gaussian(self.latest_map, object_pos1)
        # print(adjusted_cells)

        adj_map = OccupancyGrid()       
        adj_map.header = self.latest_map.header
        adj_map.info = self.latest_map.info
        adj_map.data = list(self.latest_map.data)
        for i in adjusted_cells:
            adj_map.data[i] = 30

        self.map_pub.publish(adj_map)

if __name__ == '__main__':
    rospy.init_node('map_processor')
    mp = MapProcessor()
    rospy.spin()
    # object_pos1 = Point(1.0, 2.0, 0.0)

    # draw_Gaussian(object_pos1)