#!/usr/bin/env python
import rospy
import math
#from social_predictions_helper import social_predict

from nav_msgs.msg import OccupancyGrid
from std_msgs.msg import String
from geometry_msgs.msg import Point


def social_predict(costmap, object_pos, velocity, t):
    # Convert the object position to grid coordinates
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
        self.update_sub = rospy.Subscriber('/update_map', String, self.map_callback_update, queue_size=1)
        self.map_pub = rospy.Publisher('/adj_map', OccupancyGrid, queue_size=10)
        self.latest_map = None

    def map_callback_map(self, data):
        self.latest_map = data

    def map_callback_update(self, data):
        t = 5.0

        object_pos1 = Point(1.0, 2.0, 0.0)
        velocity1 = Point(1.0, 0.5, 0.0)
        object_pos2 = Point(5.0, 2.0, 0.0)
        velocity2 = Point(-1.0, 0.5, 0.0)
        object_pos3 = Point(10.0, 3.0, 0.0)
        velocity3 = Point(0.1, -0.5, 0.0)

        objs = [[object_pos1, velocity1], [object_pos2, velocity2], [object_pos3, velocity3]]

        # predict for each detected object
        adjusted_cells = []
        for obj in objs:
            adjusted_cells += social_predict(self.latest_map, obj[0], obj[1], t)
        
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
