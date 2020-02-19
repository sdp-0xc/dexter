import flask
import os
import socket
import sys
import time

app = flask.Flask(__name__, template_folder = "html")


# Connect to the EV3 as a client on startup
# TODO: Move this to connect on click of the connect button on the homepage
def connect():
    # Create a TCP/IP socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Connect the socket to the port where the server is listening
    server_address = ('192.168.105.100', 8002)
    print('connecting to {} port {}'.format(*server_address))
    sock.connect(server_address)
    print ('Connected!')
    return (sock)

sock = connect()


# Home page of the app
@app.route("/")
def home():
    return flask.render_template("index.html")


# Gets request from the UI 
@app.route("/send", methods=["POST"])
def get_request():
    if flask.request.method == 'POST':
       command = flask.request.get_json()
       print(command["command"])
       on_press(command["command"])
    return("Sent")


# Send the command to EV3
def on_press(key):
    # If left is click send left command, if right hten send right comm
    if (str(key) == 'left'):
        sock.sendall(b'left')
    elif (str(key) == 'right'):
        sock.sendall(b'right')
    else:
        print ('Unexpected key was pressed: {0}'.format(key))


if __name__ == "__main__":
    app.run(host='0.0.0.0')