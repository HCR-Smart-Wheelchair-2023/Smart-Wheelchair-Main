#! /usr/bin/env python3

## http://146.169.149.69:5000
from flask import Flask, Response, render_template
from flask import Flask, send_from_directory
import os
from flask import request
from io import BytesIO
from PIL import Image
import base64

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return app.send_static_file('main.html')

# Serve static files
@app.route('/static')
def serve_static(path):
    return send_from_directory('static', path)


@app.route('/process-image', methods=['POST'])
def process_image():
    data = request.get_json()
    image_data = data['image_data']
    print(image_data)
    # Remove the "data:image/png;base64," prefix from the data URL
    image_data = image_data.replace('data:image/png;base64,', '')
    
    # Convert the base64-encoded data to bytes
    image_bytes = BytesIO(base64.b64decode(image_data))
    print(image_bytes)
    # Open the image using PIL
    image = Image.open(image_bytes)
    image.save('./face.png')
    # Do some processing on the image
    # ...
    
    # Return a result
    return 'Image processed successfully'

if __name__ == '__main__':
    app.run(host='0.0.0.0', ssl_context='adhoc',debug=True)