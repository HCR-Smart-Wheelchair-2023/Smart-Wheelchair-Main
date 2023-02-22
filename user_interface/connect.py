## http://146.169.149.69:5000

from flask import Flask, send_from_directory

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return app.send_static_file('thing1.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0')

# Serve static files
@app.route('/static')
def serve_static(path):
    return send_from_directory('static', path)
