import socket
import sys
import time
from pynput import keyboard

# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect the socket to the port where the server is listening
server_address = ('192.168.105.100', 8002)
print('connecting to {} port {}'.format(*server_address))
sock.connect(server_address)
print ('Connected!')

def on_press(key):
    # If left is click send left command, if right hten send right comm
    if (str(key) == 'Key.left'):
        sock.sendall(b'left')
    elif (str(key) == 'Key.right'):
        sock.sendall(b'right')
    else:
        print ('Unexpected key was pressed: {0}'.format(key))

try:
    with keyboard.Listener(on_press=on_press) as listener:
        listener.join()
finally:
    print('closing socket')
    sock.sendall(b'close')
    sock.shutdown(1)
