import ev3dev.ev3 as ev3
import socket
import sys
import time

# CONSTANTS
TIME = 0.5
SPEED = 500
CM_PER_ROTATION = 12.0 # measured empirically by rotating for 360degrees and measuring movement
FULL_ROTATION_DEGREES = 360.0 
KEYBOARD_SERVER_ADDRESS = ('192.168.105.100', 8002) # port and ip address to listen for incoming packets from the client server
MAX_NUM_AUTO_MOVEMENTS = 100 # maximum allowed movements to move automatically in attempt to reach the top-left corner

def main():
	global motor_A, motor_B, motor_C, ts_1, ts_2

	# get accessories
	motor_A = ev3.LargeMotor('outA')
	motor_B = ev3.LargeMotor('outB')
	motor_C = ev3.LargeMotor('outC')
	ts_1 = ev3.TouchSensor("in1")
	ts_2 = ev3.TouchSensor("in2")
	if (not (motor_A.connected or motor_B.connected or motor_C.connected or ts_1.connected or ts_2.connected)):
		raise Exception("please connect motors and sensors.")

	# start listening for keyboard commands from client
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	sock.bind(KEYBOARD_SERVER_ADDRESS)
	sock.listen(1)

	# main loop
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
					move_left_cm(1)
				elif data == b'right': # moving right is moving backwards in the move_left function
					move_left_cm(-1)
				elif data == b'up':
					move_up_cm(1)
				elif data == b'down': # moving down is moving backwards in the move_up function
					move_up_cm(-1)
				# diagonal movement
				elif data == b'up-right':
					move_left_cm(-1)
					move_up_cm(1)
					
				elif data == b'down-left': # moving down-left is moving backwards in the move_up_right function
					move_left_cm(1)
					move_up_cm(-1)

				elif data == b'up-left':
					move_left_cm(1)
					move_up_cm(1)

				elif data == b'down-right': # moving down-right is moving backwards in the move_up_left function
					move_left_cm(-1)
					move_up_cm(-1)

				elif data == b'close':
					break
				
				else:
					print("COMMAND UNRECOGNIZED!")


		finally:
			print('Closing connection', client_address)
			connection.close()



########################## helper functions
def move_to_top_left_corner():
	# summary: moves up and left until both sensors are clicking, which means it's in top left corner.
	
	move_counter = 0
	while (not (ts_1.is_clicked and ts_2.is_click)):
		# move 1cm diagonally up-left
		move_left_cm(1) 
		move_up_cm(1)
		# sleep until next movement
		time.sleep(0.5)

		# just safety measure so it wouldn't stuck in a loop, never let it make more than 100 moves.
		move_counter += 1
		if (move_counter > MAX_NUM_AUTO_MOVEMENTS): break

def _reset_motors_rot():
	motorA.position = 0
	motorB.position = 0
	motorC.position = 0
	motorA.position_sp = 0
	motorB.position_sp = 0
	motorC.position_sp = 0

	speed = FULL_ROTATION_DEGREES # 1 rotation per movement
	motorA.speed_sp=speed
	motorB.speed_sp=speed
	motorC.speed_sp=speed

def move_left_cm(num_cm):
	# Summary: Moves motors left for specified CMs
	_reset_motors_rot()

	degrees_to_move = num_cm / CM_PER_ROTATION * FULL_ROTATION_DEGREES
	motorA.run_to_abs_pos(position_sp = degrees_to_move)
	motorB.run_to_abs_pos(position_sp = degrees_to_move)

def move_up_cm(num_cm):
	# Summary: Moves motors up for specified CMs
	_reset_motors_rot()

	degrees_to_move = num_cm / CM_PER_ROTATION * FULL_ROTATION_DEGREES
	motorC.run_to_abs_pos(position_sp = degrees_to_move)

def move_left_time(speed, time):
	# Summary: Moves motors left for a specified time and a specified speed.
    motor_A.run_timed(speed_sp=speed, time_sp=1000*time)
    motor_B.run_timed(speed_sp=speed, time_sp=1000*time)

def move_up_time(speed, time):
	# Summary: Moves motors up for a specified time and a specified speed.
    motor_C.run_timed(speed_sp=speed, time_sp=1000*time)


if __name__ == "__main__":
	main()