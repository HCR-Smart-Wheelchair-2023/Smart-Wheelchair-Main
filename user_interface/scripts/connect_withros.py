#! /usr/bin/env python3

## http://146.169.149.69:5000
# import rospy
# from sensor_msgs.msg import Image
# from cv_bridge import CvBridge
from flask import Flask, Response, render_template
from flask import Flask, send_from_directory
import os
#import crypiptography
#from openssl import SSL

app = Flask(__name__, static_url_path='/static')

# bridge = CvBridge()
# publisher = rospy.Publisher('image_topic', Image, queue_size=10)
# rospy.init_node('flask_to_ros', anonymous=True)


@app.route('/')
def index():
    return app.send_static_file('main_ipad.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', ssl_context='adhoc',debug=True)

# Serve static files
@app.route('/static')
def serve_static(path):
    return send_from_directory('static', path)

#------------


app = Flask(__name__)



def gen():
    # Generate frames from Flask
    while True:
        #TODO frame = generate_frame() # replace with your own function that generates frames
        if frame is None:
            break
        ros_image = bridge.cv2_to_imgmsg(frame, encoding='bgr8')
        publisher.publish(ros_image)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
#------------

# import rospy
# from sensor_msgs.msg import Image
# from cv_bridge import CvBridge
# import asyncio
# import websockets
# import cv2
# import numpy as np
# from base64 import b64decode

# bridge = CvBridge()
# publisher = rospy.Publisher('image_topic', Image, queue_size=10)
# rospy.init_node('websocket_to_ros', anonymous=True)

# async def receive_video(websocket, path):
#     while True:
#         # Receive the base64-encoded string from the JavaScript client
#         data = await websocket.recv()

#         # Decode the base64-encoded string to a numpy array
#         nparr = np.frombuffer(b64decode(data.split(',')[1]), np.uint8)
#         img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#         # Convert the numpy array to a ROS Image message
#         ros_image = bridge.cv2_to_imgmsg(img, encoding='bgr8')

#         # Publish the ROS Image message to the 'image_topic' topic
#         publisher.publish(ros_image)

# async def main():
#     async with websockets.serve(receive_video, 'localhost', 8000):
#         await asyncio.Future()  # run forever

# if __name__ == '__main__':
#     try:
#         main()
#     except rospy.ROSInterruptException:
#         pass
