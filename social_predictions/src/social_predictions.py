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

def gaussian2d(x, y, x0, y0, sigma_x, sigma_y, theta):
    a = np.cos(theta)**2/(2*sigma_x**2) + np.sin(theta)**2/(2*sigma_y**2)
    b = -np.sin(2*theta)/(4*sigma_x**2) + np.sin(2*theta)/(4*sigma_y**2)
    c = np.sin(theta)**2/(2*sigma_x**2) + np.cos(theta)**2/(2*sigma_y**2)
    z = np.exp(-(a*(x-x0)**2 + 2*b*(x-x0)*(y-y0) + c*(y-y0)**2))
    return z

def draw_Gaussian(costmap, object_pos, orientation, distribution_scale_factor = 1, gaus_sep = 2):

    mu1_x = 0
    mu1_y = 0


    # Parameters TO TUNE 
    sigma1_x = 1 * distribution_scale_factor
    sigma1_y = 1 * distribution_scale_factor

    sigma2_x = 2 * distribution_scale_factor
    sigma2_y = 1 * distribution_scale_factor

    # Create a meshgrid of points to evaluate the normal distributions
    x, y = np.mgrid[-10:10:1, -10:10:1]
    pos = np.empty(x.shape + (2,))
    pos[:, :, 0] = x; pos[:, :, 1] = y

    # Finding location of second Guassian
    mu2_x = mu1_x + (gaus_sep * math.cos(orientation.x))
    mu2_y = mu1_y + (gaus_sep * math.sin(orientation.x))

    # Distribution of Gaussians
    Z1 = gaussian2d(x, y, mu1_x, mu1_y, sigma1_x, sigma1_y, -orientation.x)
    Z2 = gaussian2d(x, y, mu2_x, mu2_y, sigma2_x, sigma2_y, -orientation.x)

    # Superposition of Gaussians
    Z = Z1+Z2



    # Scaling the array 
    # Find the minimum and maximum values in the array
    min_val = np.min(Z)
    max_val = np.max(Z)
    
    # Scale the array to the range between 0 and 100
    Z_scaled = ((Z - min_val) * 100 / (max_val - min_val)).astype(int)
    # print("Z: ", Z_scaled)
    
    z1_flat = Z_scaled.flatten().tolist()
    grid_x = int((object_pos.x - costmap.info.origin.position.x) / costmap.info.resolution)
    grid_y = int((object_pos.y - costmap.info.origin.position.y) / costmap.info.resolution)
    # print(z1_flat)
    relative_pos = []

    for i in pos: 
        for j in i:
            x_relative = grid_x + int(j[0])
            y_relative = grid_y + int(j[1])
            flat_pos = int(x_relative + y_relative * costmap.info.width)
            relative_pos.append(flat_pos)


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
        distribution_scale_factor = 1
        gaus_sep = 2        

        adj_map = OccupancyGrid()       
        adj_map.header = self.latest_map.header
        adj_map.info = self.latest_map.info
        adj_map.data = list(self.latest_map.data)

        #predict for each detected object
        adjusted_cells = []
        for person in data.person:
            if person.static.data:
                pos, vals = draw_Gaussian(self.latest_map, person.odom.pose.pose.position, person.odom.pose.pose.orientation, distribution_scale_factor, gaus_sep)
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