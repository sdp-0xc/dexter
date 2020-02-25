`dexterServer.py` runs on the EV3. To start the server, ssh into the EV3 and run `python3 dexterServer.py`

Then move into the `DexterApp` directory on the local machine and run
`python3 app.py`

This starts a dev server from Flask. Open the link specified (it all runs locally) and the EV3 should run the motors. The stop button currently closes the connection from the webserver to the EV3.

Note: Only tested on DICE. To run this on your personal machine, you need to log into the SDPRobots WiFi.