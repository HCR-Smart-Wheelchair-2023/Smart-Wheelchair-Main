import numpy as np
from shapely.geometry import Point
from shapely.geometry.polygon import Polygon

width = 1000
height = 1000


# add the coordinates of the points in the map
Y_OFFSET = 100
X_OFFSET = 100
map_coordinates = [(X_OFFSET,774 + Y_OFFSET),(X_OFFSET + 121,774 + Y_OFFSET),(500,900),(100,900)]


# point = Point(0.5, 0.5)
polygon = Polygon(map_coordinates)
# print(polygon.contains(point))


p_num = width * height
arr = np.random.randint(0,255,p_num)

with open('test.pgm', 'wb') as pgm_file:
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
