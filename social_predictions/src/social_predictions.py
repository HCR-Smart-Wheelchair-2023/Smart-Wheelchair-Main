#!/usr/bin/env python
import rospy
import math
import numpy as np
import cv2
from scipy.stats import multivariate_normal

from people_msg.msg import People, Person
# from zed_interfaces.msg import ObjectsStamped
from nav_msgs.msg import OccupancyGrid
from std_msgs.msg import String
from geometry_msgs.msg import Point

    
def draw_Gaussian(costmap, object_pos, orientation, distribution_scale_factor = 100):

    x_vector = abs(math.cos(orientation))
    y_vector = abs(math.sin(orientation))

    cov111 = max(10, int(x_vector*distribution_scale_factor))
    cov122 = max(10, int(y_vector*distribution_scale_factor))
    # Define the parameters of the two normal distributions
    mean1 = [0, 0]
    cov1 = [[cov111, 0], [0, cov122]]

    # Create a meshgrid of points to evaluate the normal distributions
    x, y = np.mgrid[-50:50:1, -50:50:1]
    pos = np.empty(x.shape + (2,))
    pos[:, :, 0] = x; pos[:, :, 1] = y

    # print(pos.shape)

    # Evaluate the normal distributions at the meshgrid points
    rv1 = multivariate_normal(mean1, cov1)
    z1 = np.array(rv1.pdf(pos))
    
    z1_new = (z1 * 10000).astype(int)
    z1_flat = z1_new.flatten().tolist()
    grid_x = int((object_pos.x - costmap.info.origin.position.x) / costmap.info.resolution)
    grid_y = int((object_pos.y - costmap.info.origin.position.y) / costmap.info.resolution)

    relative_pos = []

    for i in pos: 
        for j in i:
            x_relative = grid_x + int(j[0])
            y_relative = grid_y + int(j[1])
            flat_pos = int(x_relative + y_relative * costmap.info.width)
            relative_pos.append(flat_pos)


    # print("relative_pos", len(relative_pos))
    # print("z1_flat", len(z1_flat))


    return relative_pos, z1_flat



def social_predict(costmap, object_pos, velocity, t = 5.0):
    # Convert the object position to grid coordinatesn
    grid_x = int((object_pos.x - costmap.info.origin.position.x) / costmap.info.resolution)
    grid_y = int((object_pos.y - costmap.info.origin.position.y) / costmap.info.resolution)

    # Calculate the number of cells the object will move in the next t seconds
    cells_to_move_x = int(math.ceil(abs(velocity.x) * t / costmap.info.resolution))
    cells_to_move_y = int(math.ceil(abs(velocity.y) * t / costmap.info.resolution))

    # determine the direction of the line
    x_step = 1 if velocity.x > 0 else -1
    y_step = 1 if velocity.y > 0 else -1

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
        self.update_sub = rospy.Subscriber('/tracked_people', People, self.map_callback_update, queue_size=1)
        self.map_pub = rospy.Publisher('/adj_map', OccupancyGrid, queue_size=10)
        self.latest_map = None

    def map_callback_map(self, data):
        self.latest_map = data

    def map_callback_update(self, data):
        
        # Params to tune 
        t = 3.0
        distribution_scale_factor = 50
        
        adj_map = OccupancyGrid()       
        adj_map.header = self.latest_map.header
        adj_map.info = self.latest_map.info
        adj_map.data = list(self.latest_map.data)

        #predict for each detected object
        adjusted_cells = []
        for person in data.person:
            if person.static.data:
                pos, vals = draw_Gaussian(self.latest_map, person.odom.pose.pose.position, person.odom.pose.pose.orientation.x, distribution_scale_factor)
                for (i, pos) in enumerate(pos):
                    if vals[i] != 0:
                        adj_map.data[pos] = vals[i] #min(100, vals[i]+ adj_map.data[pos])

            else:
                adjusted_cells += social_predict(self.latest_map, person.odom.pose.pose.position, person.odom.twist.twist.linear, t)
                for i in adjusted_cells:
                    adj_map.data[i] = 30 #min(100, 30 + adj_map.data[i])
                   


        self.map_pub.publish(adj_map)

if __name__ == '__main__':
    rospy.init_node('map_processor')
    mp = MapProcessor()
    rospy.spin()
    # object_pos1 = Point(1.0, 2.0, 0.0)

    # draw_Gaussian(object_pos1)