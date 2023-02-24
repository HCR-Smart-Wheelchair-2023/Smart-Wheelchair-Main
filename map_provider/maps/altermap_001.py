import numpy as np
from shapely.geometry import Point, LineString
from shapely.geometry.polygon import Polygon

t = 100
obj_orig_pos = np.array([10, 10])
obj_vel = np.array([3, 2])
obj_fin_pos = obj_orig_pos + (obj_vel * t)



width = 1000
height = 1000


# add the coordinates of the points in the map
Y_OFFSET = 100
X_OFFSET = 100
OFFSETS = [Y_OFFSET, X_OFFSET]
map_coordinates = [(X_OFFSET,500 + Y_OFFSET),(X_OFFSET + 500,300 + Y_OFFSET),(X_OFFSET + 200,Y_OFFSET),(X_OFFSET,Y_OFFSET)]

object_path_coordinates = [(OFFSETS + obj_orig_pos), (OFFSETS + obj_fin_pos)]

# point = Point(0.5, 0.5)
polygon = Polygon(map_coordinates)
object_path = LineString(object_path_coordinates)
# print(polygon.contains(point))


p_num = width * height
arr = np.random.randint(0,255,p_num)

with open('map.pgm', 'wb') as pgm_file:
    pgmHeader = 'P5' + ' ' + str(width) + ' ' + str(height) + ' ' + str(255) +  '\n'
    pgmHeader_byte = bytearray(pgmHeader,'utf-8')
    pgm_file.write(pgmHeader_byte)

    img = np.reshape(arr,(height,width))
    for y in range(height):
        # print(y)
        # bnd = list(img[j,:])
        bnd = [255 if (polygon.contains(Point(x, y)) and not object_path.contains(Point(x, y)) )else 0 for x in range(width)]
        # print(bnd)
        pgm_file.write(bytearray(bnd)) # for 8-bit data only
