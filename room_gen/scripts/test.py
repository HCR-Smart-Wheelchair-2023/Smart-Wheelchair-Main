import numpy as np
from stl import mesh
import os

vectors = [[0,774],[121,0],[0,250],[-2500,0],[0,205],[2667, 0],[0,-455],[221,0],[0,-774],[-509,0]]
vectors = [np.array([float(item)/100.0 for item in vector]) for vector in vectors]
pos = np.zeros(2)

vertices = []
for vector in vectors:
    vertices.append(np.array(list(pos) + [0]))
    pos = np.add(vector, pos)
num_corners = len(vertices)
additional_vertices = []
for vertex in vertices:
    vertex = np.copy(vertex)
    vertex[2] = 2
    additional_vertices.append(vertex)
vertices = vertices + additional_vertices
print(vertices)

faces = []
for index in range(num_corners):
    next_index = (index + 1) % num_corners
    bottom_frame = [index, next_index, next_index + num_corners]
    top_frame = [index, next_index + num_corners, index + num_corners]
    faces.append(bottom_frame)
    faces.append(top_frame)

faces = np.array(faces)
vertices = np.array(vertices)

# Create the mesh
cube = mesh.Mesh(np.zeros(faces.shape[0], dtype=mesh.Mesh.dtype))
for i, f in enumerate(faces):
    for j in range(3):
        cube.vectors[i][j] = vertices[f[j],:]

# Write the mesh to file "cube.stl"
cube.save(os.path.dirname(__file__) + '/../meshes/room.stl')


urdf = """
<?xml version="1.0" encoding="utf-8"?>
<!-- This URDF was automatically created by SolidWorks to URDF Exporter! Originally created by Stephen Brawner (brawner@gmail.com)
     Commit Version: 1.6.0-4-g7f85cfe  Build Version: 1.6.7995.38578
     For more information, please see http://wiki.ros.org/sw_urdf_exporter -->
<robot
  name="room_description">
  <link
    name="room">
    <inertial>
      <origin
        xyz="-4.61166074731966 -9.68859341522421 1.5"
        rpy="0 0 0" />
      <mass
        value="125565" />
      <inertia
        ixx="10034965.7831094"
        ixy="-2525394.91001045"
        ixz="-4.8724506822168E-12"
        iyy="2173837.70989483"
        iyz="3.43794307454559E-10"
        izz="12020455.9930043" />
    </inertial>
    <visual>
      <origin
        xyz="0 0 0"
        rpy="0 0 0" />
      <geometry>
        <mesh
          filename="package://room_description/meshes/room.STL" />
      </geometry>
      <material
        name="">
        <color
          rgba="0.792156862745098 0.819607843137255 0.933333333333333 1" />
      </material>
    </visual>
    <collision>
      <origin
        xyz="0 0 0"
        rpy="0 0 0" />
      <geometry>
        <mesh
          filename="package://room_description/meshes/room.STL" />
      </geometry>
    </collision>
  </link>
</robot>
"""


csv_text = """
Link Name,Center of Mass X,Center of Mass Y,Center of Mass Z,Center of Mass Roll,Center of Mass Pitch,Center of Mass Yaw,Mass,Moment Ixx,Moment Ixy,Moment Ixz,Moment Iyy,Moment Iyz,Moment Izz,Visual X,Visual Y,Visual Z,Visual Roll,Visual Pitch,Visual Yaw,Mesh Filename,Color Red,Color Green,Color Blue,Color Alpha,Collision X,Collision Y,Collision Z,Collision Roll,Collision Pitch,Collision Yaw,Collision Mesh Filename,Material Name,SW Components,Coordinate System,Axis Name,Joint Name,Joint Type,Joint Origin X,Joint Origin Y,Joint Origin Z,Joint Origin Roll,Joint Origin Pitch,Joint Origin Yaw,Parent,Joint Axis X,Joint Axis Y,Joint Axis Z,Limit Effort,Limit Velocity,Limit Lower,Limit Upper,Calibration rising,Calibration falling,Dynamics Damping,Dynamics Friction,Safety Soft Upper,Safety Soft Lower,Safety K Position,Safety K Velocity
base_link,-4.61166074731966,-9.68859341522421,1.5,0,0,0,125565,10034965.7831094,-2525394.91001045,-4.8724506822168E-12,2173837.70989483,3.43794307454559E-10,12020455.9930043,0,0,0,0,0,0,package://gen_room/meshes/room.STL,0.792156862745098,0.819607843137255,0.933333333333333,1,0,0,0,0,0,0,package://gen_room/meshes/room.STL,,room_1-1,Coordinate System1,,,,0,0,0,0,0,0,,0,0,0,,,,,,,,,,,,
"""
