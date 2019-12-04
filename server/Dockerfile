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

# Listen on PORT 5000
# EXPOSE 5000

# COPY in the rest of your app’s source code from your host to your image filesystem.
COPY . .

CMD [ "npm", "start" ]   