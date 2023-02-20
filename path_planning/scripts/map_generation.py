import numpy as np
from shapely.geometry import Point
from shapely.geometry.polygon import Polygon
import os
import yaml
# 83 y 213 x
# 70 90 20
width = 500
height = 500
resolution = 0.1
vectors_cm = [(0,774),(121,0),(0,250),(-2500,0),(0,205),(2500 + 167, 0),(0,-250-205),(221,0),(0,-774),(-121-221-167,0)]


# add the coordinates of the points in the map
Y_OFFSET = int(height/2)
X_OFFSET = int(width/2)

map_coordinates = []
coordinate = (X_OFFSET,Y_OFFSET)
for vector in vectors_cm:
    map_coordinates.append(coordinate)
    coordinate = (coordinate[0] + 1 * int(vector[0]/(100*resolution)), coordinate[1] + -1 * int(vector[1]/(100*resolution)))
# map_coordinates = [(X_OFFSET, Y_OFFSET),(X_OFFSET,Y_OFFSET +774),(X_OFFSET + 121,774 + Y_OFFSET),(500,900),(100,900)]


# point = Point(0.5, 0.5)
polygon = Polygon(map_coordinates)
# print(polygon.contains(point))


p_num = width * height
arr = np.random.randint(0,255,p_num)

with open(os.path.dirname(__file__) + '/../map/map.pgm', 'wb') as pgm_file:
    pgmHeader = 'P5' + ' ' + str(width) + ' ' + str(height) + ' ' + str(255) +  '\n'
    pgmHeader_byte = bytearray(pgmHeader,'utf-8')
    pgm_file.write(pgmHeader_byte)

    img = np.reshape(arr,(height,width))
    for y in range(height):
        print(y)
        # bnd = list(img[j,:])
        bnd = [255 if polygon.contains(Point(x, y)) else 0 for x in range(width)]
        # print(bnd)
        pgm_file.write(bytearray(bnd)) # for 8-bit data only

with open(os.path.dirname(__file__) + '/../map/map.yaml', 'w', encoding='utf8') as yaml_file:
    data = {
        "image":"map.pgm",
        "resolution" : resolution,
        "origin" : [-1*X_OFFSET*resolution,-1*Y_OFFSET*resolution,0.00],
        "negate":0,
        "occupied_thresh": 0.65,
        "free_thresh": 0.196
    }
    yaml.dump(data, yaml_file)
