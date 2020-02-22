import ev3dev.ev3 as ev3
import socket
import sys
import time

motor_A = ev3.LargeMotor('outA')
motor_B = ev3.LargeMotor('outB')
motor_C = ev3.LargeMotor('outC')
# ts1 = ev3.TouchSensor("in1")
# ts2 = ev3.TouchSensor("in2")

if (not (motor_A.connected or motor_B.connected)):
	print("please connect motors")
	exit()


def move_hor(speed,time):
    motor_A.run_timed(speed_sp=speed, time_sp=1000*time)
    motor_B.run_timed(speed_sp=speed, time_sp=1000*time)


def move_vert(speed, time):
    motor_C.run_timed(speed_sp=speed, time_sp=1000*time)


def move_diag(speed_h, speed_v, time):
	motor_A.run_timed(speed_sp=speed, time_sp=1000*time)
    motor_B.run_timed(speed_sp=speed, time_sp=1000*time)
	motor_C.run_timed(speed_sp=speed, time_sp=1000*time)

TIME = 0.5
SPEED = 500
KEYBOARD_SERVER_ADDRESS = ('192.168.105.100', 8002)


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
		# Receive the data in small chunks and retransmit it
		# TODO: Add diagonal control
		while True:
			data = connection.recv(16)
			if data == b'left':
				print("turning left")
				move_hor(SPEED,0.5)

			if data == b'right':
				print ('turning right')
				move_hor(-SPEED,0.5)

			if data == b'up':
				print('turning up'):
				move_vert(SPEED, 0.5)

			if data == b'down':
				print('turning down'):
				move_vert(-SPEED, 0.5)

			if data == b'close':
				break

	finally:
		print('Closing connection', client_address)
		connection.close()
