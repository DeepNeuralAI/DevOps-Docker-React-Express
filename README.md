# Docker

![Docker Logo](https://www.docker.com/sites/default/files/social/docker_facebook_share.png)

## Recap
```
Docker is a platform for developers and sysadmins to develop, deploy, and run applications with containers. 

The use of Linux containers to deploy applications is called containerization (Source: Docker)
```
### Why use containers?

* Flexible
* Lightweight
* Portable
* Scalable
* Stackable

### Why should you care?

**If you care about trends, then:**

![Interest over time ](https://d33wubrfki0l68.cloudfront.net/88f76d82d08f74596ec8540b8bf092e6e82de328/1ceab/images/interest.png)


**If you care about DevOps or development**:

![Supply Chain](https://i1.wp.com/www.docker.com/sites/default/files/Docker_Supply-chain-V1.5-01.png?zoom=2&ssl=1)

![image](https://user-images.githubusercontent.com/34294344/70018703-1a362a80-15db-11ea-891f-f766dc8d8187.png)


### Front End

Docker can help you deploy applications easier and cheaper

### Back End

Docker can help you spin up an environment quickly and share between colleagues. Someone can start working on your projects with one or two commands.

## Virtual Machines

The industry standard is to use VMs to run software applications. These run applications on a guest OS which runs on virtual hardware, powered by the server's host OS.

**Pros:** _Full isolation for applications_

**Cons:** _Computational overhead is substantial_

## A different approach

![Container vs VM](https://cdn-images-1.medium.com/max/1600/1*C8lhTejh1rdtuIsV3BHTrA.png)

## Images and Containers

An **image** is the package that includes everything needed to run an application. 

This includes:
* Code
* Runtime
* Libraries
* Environment variables
* Configuration Files

We can think of images as the blueprint of our application which form the basis for our containers. 

A **container** is an *instance* of an image. In other words, an image is converted to a container once in memory. 

Fundamentally, a container is nothing but a running process, with some added encapsulation features applied to it in order to keep it isolated from the host and from other containers. 

One of the most important aspects of container isolation is that each container interacts with its own, private filesystem; this filesystem is provided by a Docker image. 

An image includes everything needed to run an application -- the code or binary, runtimes, dependencies, and any other filesystem objects required.

The key point I want to make is:

`Containers allow applications to be abstracted from the environment they are actually run from`

Whether the environment is a school, a data center, or your personal laptop, containers offer a **predictable** environment that is isolated and can run from anywhere.

![image](https://user-images.githubusercontent.com/34294344/70022839-ac452f80-15e9-11ea-9474-64cd21ad5213.png)

![image](https://user-images.githubusercontent.com/34294344/70026680-6b064d00-15f4-11ea-8009-035c4b42c551.png)

## Getting Started

Download Docker Desktop -- a full development platform for creating containerized applications. 

[Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/)

[Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/)


### Docker Hub - A library of packages/images

![image](https://user-images.githubusercontent.com/34294344/57692565-6f840c00-768a-11e9-8576-801799de12a3.png)


### Test Docker Version

```bash
$ docker --version

Docker version 17.12.0-ce, build c97c6d6

```

### Common Docker Commands

```bash
# Info
docker info

# List Docker Images
docker image ls

# List Docker Containers
docker container ls
docker container ls --all
docker ps

# Run a container in interactive mode
docker container run -it -p 80:80 nginx

# Run a container in detached mode
docker container run -d -p 80:80 nginx

# Name a container
docker container run -d -p 80:80 --name nginx-server nginx

# Stop a container
docker container stop (ID)

# Stop ALL containers
docker stop $(docker ps -aq)

# Remove a container
docker container rm (ID)

# Remove ALL containers
docker rm $(docker ps -aq)

# Remove an image
docker image rm [IMAGE]

# Remove all images
docker rmi $(docker images -a -q)
```

## Summary

[Slides Here](https://docs.google.com/presentation/d/1SjBTNGAt98rRotB6VBL7-NsOxjTUSBuMsOYkNBcyMZE/edit)

Docker is a platform for developers and sysadmins to build, share, and run applications with containers. The use of containers to deploy applications is called containerization. Containers are not new, but their use for easily deploying applications is.

![container](https://docs.docker.com/get-started/images/laurel-docker-containers2019.png)

It's the future. Developers will ultimately join your project later. 

With Docker, they will not have to manage dependencies in their local dev environment. 

Additionally, a docker development file could serve as a solid deployment tool later for production. 

### Containerizing an Application

In general, the development workflow looks like this:

1. Create and test individual containers for each component of your application by first creating Docker images.

2. Assemble your containers and supporting infrastructure into a complete application, expressed either as a Docker stack file or in YAML.

3. Test, share and deploy your complete containerized application.

Note:
> Containerized development environments are easier to set up than traditional development environments, once you learn how to build images as we’ll discuss below. 

> This is because a containerized development environment will isolate all the dependencies your app needs inside your Docker image; there’s no need to install anything other than Docker on your development machine. In this way, you can easily develop applications for different stacks without changing anything on your development machine.

### Create a Dockerfile

Dockerfile:

Read more about Dockerfile [here](https://docs.docker.com/engine/reference/builder/#usage)

> a Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Docker can build images automatically by reading the instructions from a Dockerfile.


Steps:
1. Pulls Node Image
2. Sets WorkDir within container
3. Copies `package.json` to workdir
4. Installs dependencies
5. Copies our code
6. Exposes the port
7. Starts the server

### Server Side (Express / Node)

Dockerfile

```python
# This is an official image, built by the node.js vendors and validated by Docker 
FROM node:10

# Use WORKDIR to specify that all subsequent actions should be taken 
# from the directory /usr/src/app in your image filesystem (never the host’s filesystem).
WORKDIR /usr/src/app

# COPY the file package.json from your host to the 
# present location (.) in your image (so in this case, to /usr/src/app/package.json)
COPY package.json .

# RUN the command npm install inside your image filesystem 
# (which will read package.json to determine your app’s node dependencies, and install them)
RUN npm install

# COPY in the rest of your app’s source code from your host to your image filesystem.
COPY . .

# Listen on PORT 5000
EXPOSE 5000

CMD [ "npm", "start" ]   
```

**Build**: `docker build -t node/test . `

**Run**: `docker run -d -p 5000:5000 node/test`

### Client Side (React)

Dockerfile:

```python
# This is an official image, built by the node.js vendors and validated by Docker 
FROM node:10

# Use WORKDIR to specify that all subsequent actions should be taken 
# from the directory /usr/src/app in your image filesystem (never the host’s filesystem).
WORKDIR /usr/src/app

# COPY the file package.json from your host to the 
# present location (.) in your image (so in this case, to /usr/src/app/package.json)
COPY package.json .

# RUN the command npm install inside your image filesystem 
# (which will read package.json to determine your app’s node dependencies, and install them)
RUN npm install

# Listen on PORT 3000
EXPOSE 3000

# COPY in the rest of your app’s source code from your host to your image filesystem.
COPY . .

CMD [ "npm", "start" ]   
```

**Build**:  `docker build -t react/test . `

**Run**:  `docker run -d -p 3000:3000 react/test`

### Docker-Compose

Spin up multiple containers that are isolated but able to communicate with each other.

<h4>Why?</h4>

1. Scaling
  - Multiple instances of containers can be created to handle load
2. Create an environment easily
  - Makes deployment easier
  - Makes development easier

docker-compose.yml
```python
version: '3.6'
services:
  client:
      restart: always
      build:
        context: ./client
      ports:
          - 3000:3000
      volumes:
          - ./client:/client
          - /client/node_modules
      links:
          - server
  server:
      restart: always
      build:
        context: ./server
      ports:
          - 5000:5000
      volumes:
          - ./server:/server
          - /server/node_modules
      depends_on:
          - mongodb
  mongodb:
    image: mongo
    # restart: always
    container_name: mongodb
    ports:
        - 27017:27017
```

Before we run the above `docker-compose` file, let's comment out the `EXPOSE {PORT}` commands from each `Dockerfile`. 

Additionally, we want to stop all running containers as the port numbers will conflict. 

To check running containers, type `docker container ps`

To stop container, run `docker container stop {CONTAINER ID}`

To stop all containers, use: `docker stop $(docker ps -a -q)`

Then finally, run:

```
docker-compose up
```

The folder structure should end up looking similar to this:

![image](https://user-images.githubusercontent.com/34294344/70026851-d05a3e00-15f4-11ea-9183-ab9938be5f71.png)

![image](https://user-images.githubusercontent.com/34294344/70026592-40b48f80-15f4-11ea-9c5e-86df178caabd.png)

