import flask
import os
import socket
import sys
import time
import flask_mail

app = flask.Flask(__name__, template_folder = "html")
sock = None

app.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_USERNAME = 'dexterapp.noreply@gmail.com',
    MAIL_PASSWORD = 'sdp12dexter',
))

mail = flask_mail.Mail(app)

# Connect to the EV3 as a client on startup
# TODO: Set UI to spin loading until connection is done
@app.route("/connect", methods = ["POST"])
def connect():
    # Check the command sent
    if flask.request.method == 'POST':
       command = flask.request.get_json()
       print(command["command"])
       if command["command"] !=  "connect":
           return("incorrect command")

    # Create a TCP/IP socket
    global sock
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Connect the socket to the port where the server is listening
    server_address = ('192.168.105.100', 8002)
    print('connecting to {} port {}'.format(*server_address))
    sock.connect(server_address)
    print ('Connected!')
    return ("connected")


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
        return("sent")
    return("invalid HTTP method")


# Send the command to EV3
def on_press(key):
    # Validate input and send command to EV3
    key = str(key)
    directions = set(["left", "right", 
                        "up", "down", 
                        "up-right", "up-left", 
                        "down-right", "down-left"])
    if key in directions:
        sock.sendall(bytes(key, 'utf-8'))
    else:
        print ('Unexpected key was pressed: {0}'.format(key))


@app.route("/disconnect", methods = ["POST"])
def close_connection():
    print('closing socket')
    sock.sendall(b'close')
    sock.shutdown(1)
    return ("closed")


# TO IMPLEMENT
@app.route("/photo", methods = ["GET"])
def take_photo():
    print('taking photo')

    # TO DO: RUN SCRIPT THAT TAKES PHOTO

    # REPLACE BY LOCATION OF THE LOCATION OF FILE TAKEN FROM CAMERA
    return ("./static/img/dexter.png")

# SENDS EMAIL
@app.route("/email", methods=["POST"])
def send_photo():
    if flask.request.method == 'POST':
        command = flask.request.get_json()
        print(command["command"])
        msg = flask_mail.Message(subject="New whiteboard photo", recipients=[command["email"]], sender="dexterapp.noreply@gmail.com")

        # TO DO: SPECIFY LOCATION AND NAME OF JPG FILE THAT HOLDS THE WHITEBOARD SNAPSHOT TAKEN FROM CAMERA
        with app.open_resource(command["img"]) as fp:
            msg.attach("dexter.png", "dexter/png", fp.read())

        mail.send(msg)
        return("sent")


if __name__ == "__main__":
    app.run(host='0.0.0.0')