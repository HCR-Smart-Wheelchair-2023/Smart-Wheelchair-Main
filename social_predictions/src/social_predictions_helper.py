import rospy
import math

from nav_msgs.msg import OccupancyGrid
from std_msgs.msg import String


def social_predict(costmap, object_pos, velocity, t):
    # Convert the object position to grid coordinates
    grid_x = int((object_pos.x - costmap.info.origin.position.x) / costmap.info.resolution)
    grid_y = int((object_pos.y - costmap.info.origin.position.y) / costmap.info.resolution)

    # Calculate the number of cells the object will move in the next t seconds
    cells_to_move_x = int(math.ceil(abs(velocity.x) * t / costmap.info.resolution))
    cells_to_move_y = int(math.ceil(abs(velocity.y) * t / costmap.info.resolution))

    # Create a list of cells that the object will occupy
    cells = []
    for dx in range(-cells_to_move_x, cells_to_move_x+1):
        for dy in range(-cells_to_move_y, cells_to_move_y+1):
            x = grid_x + dx
            y = grid_y + dy
            if x >= 0 and x < costmap.info.width and y >= 0 and y < costmap.info.height:
                idx = x + y * costmap.info.width
                if costmap.data[idx] == 0: # Cell is unoccupied
                    cells.append(idx)

    return cells
