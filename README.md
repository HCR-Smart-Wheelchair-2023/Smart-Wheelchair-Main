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

## On the Raspberry PI
- SSH into the PI with user "hpr" and then run the following to start the server
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
To get terminal access to the container, (requires teh above command to be running)
```bash
make run-external
```
