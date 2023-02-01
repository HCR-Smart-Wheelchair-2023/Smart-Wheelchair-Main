# RNET Wheelchair base setup

This repository contains all the code necessary to get the rnet wheelchair bases moving. The architecture usually revolves around:
 - A Jetson: roscore (+ joystick)
 - A raspberry pi: gets orders from the Jetson and injects them in the CAN bus
 - A main computer: to manage everything (+ joystick)

# Prerequisites
 - Docker must be installed on all 3 computers
 - On each computer, setup [docker without sudo](https://docs.docker.com/engine/install/linux-postinstall/)
 - The raspberry pi must be connected to the CAN bus (see this [README](can-to-rnet/README.md))
 - Get the IP addresses of all 3 computers
 - Setup ssh keys between the main laptop and the others

# Installation
## Common steps for all machines
Clone this repository, pull the submodules, **put the right values in the configuration file**:
```bash
git clone https://github.com/ImperialCollegeLondon/rnet-wheelchair-docker.git
cd rnet-wheelchair-docker
git submodule update --init --recursive

cp .env.example .env
vim .env  # Put the right IP addresses
```

## On the Raspberry Pi
Build the docker image:
```bash
make build-pi
```

## On the Jetson
Build the docker image:
```bash
make build-jetson
```

## On the main computer
Build the docker image:
```bash
make build-local
```

# Using the package
Once everything is installed, you can control everything from your main computer. 
> NB: for now all commands including `joystick` assume that the joystick is plugged in the Jetson, and `nojoystick` that it is plugged in the remote computer. This is confusing and will be improved later.

To start everything, simply run `make restart-joystick` or `make restart-nojoystick` on the main computer, and it will restart the raspberry pi driver and the Jetson node remotely.
Make sure the base's built in controller (the remote with a little joystick, speed buttons, a horn...) is on.
You can then run `make run-local` (still on the main computer) to start the SLAM (or `make run-local-nojoystick` to include the joystick nodes).