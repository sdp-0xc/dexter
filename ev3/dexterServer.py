import ev3dev.ev3 as ev3
import socket
import sys
import time

# CONSTANTS
TIME = 0.5
SPEED = 500
KEYBOARD_SERVER_ADDRESS = ('192.168.105.100', 8002)

# get motors
motor_A = ev3.LargeMotor('outA')
motor_B = ev3.LargeMotor('outB')
motor_C = ev3.LargeMotor('outC')
# ts1 = ev3.TouchSensor("in1")
# ts2 = ev3.TouchSensor("in2")
if (not (motor_A.connected or motor_B.connected or motor_C.connected)):
	print("please connect motors")
	exit()


# movement functions
def move_left(speed, time):
    motor_A.run_timed(speed_sp=speed, time_sp=1000*time)
    motor_B.run_timed(speed_sp=speed, time_sp=1000*time)

def move_up(speed, time):
    motor_C.run_timed(speed_sp=speed, time_sp=1000*time)


# start listening for keyboard commands from client
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.bind(KEYBOARD_SERVER_ADDRESS)
sock.listen(1)


print("Ready")

while True:
	# Wait for a connection
	print('waiting for a connection')
	connection, client_address = sock.accept()
	try:
		print('connection from', client_address)
		# start loop of receiving data from connection
		while True:
			# Receive the data in small chunks and act accordingly
			data = connection.recv(16)

			print (data)
			if data == b'left':
				move_left(SPEED, TIME)
			elif data == b'right': # moving right is moving backwards in the move_left function
				move_left(-SPEED, TIME)
			elif data == b'up':
				move_up(SPEED, TIME)
			elif data == b'down': # moving down is moving backwards in the move_up function
				move_up(-SPEED, TIME)
			
			elif data == b'up-right':
				move_left(-SPEED, TIME)
				move_up(SPEED, TIME)
				
			elif data == b'down-left': # moving down-left is moving backwards in the move_up_right function
				move_left(SPEED, TIME)
				move_up(-SPEED, TIME)

			elif data == b'up-left':
				move_left(SPEED, TIME)
				move_up(SPEED, TIME)

			elif data == b'down-right': # moving down-right is moving backwards in the move_up_left function
				move_left(-SPEED, TIME)
				move_up(-SPEED, TIME)

			elif data == b'close':
				break
			
			else:
				print("COMMAND UNRECOGNIZED!")


	finally:
		print('Closing connection', client_address)
		connection.close()
