# Information

This repository contains the basic setup needed to be able to drive the wheelchair. Currently only a "cmd_vel" topic is setup from which a subscriber sends commands to the raspberry pi to move the robot.

# RNET Wheelchair base setup

- Clone the repository
```bash
git clone https://github.com/max-wickham/rnet-wheelchair-docker.git

```

- Copy the env file and set the correct IP addresses
```bash
cp .env.example .env
vim .env
```

- If using the robot not simulation set the MODE environment variable to 'robot'

## On the Raspberry PI
- SSH into the PI with user "hpr" and then run the following to start the serve

- TODO this start shell script still needs to be made, currently the PI is started using a python script in a directory I can't remember. Eventually this should be set up as a make command that SSHs into the PI and starts this script. (Potentially this could be part of the start up sequence of the script that communicates with the PI?)

```bash
./start
```

## On the main computer
Build the docker image:
```bash
make build-external
```
Run the docker image to start ros core
```bash
make run-external-core
```
To launch the main ros program, (requires the above command to be running)
```bash
make run-external-main
```
To access a terminal in laptop core ros container
```bash
make run-external-bash
```

## Driving the Robot

- Once "make run-external-core" and "make run-external-main" are running it should be possible to publish to "/cmd_vel" to drive the robot



## Starting Simulation for Sim Development

```
roslaunch wheele_gazebo wheele.launch
```
