## http://146.169.149.69:5000

from flask import Flask, send_from_directory
#import crypiptography
#from openssl import SSL

app = Flask(__name__, static_url_path='/static')
# Enable HTTPS
#context = SSL.Context(SSL.PROTOCOL_TLSv1_2)
#context.load_cert_chain('path/to/cert.pem', 'path/to/key.pem')

@app.route('/')
def index():
    return app.send_static_file('main.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', ssl_context='adhoc')

# Serve static files
@app.route('/static')
def serve_static(path):
    return send_from_directory('static', path)
