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
