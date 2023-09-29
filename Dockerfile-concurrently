FROM node:18

# Install a process manager (e.g., concurrently)
RUN npm install -g concurrently

# Create a working directory for the application
WORKDIR /app

# Copy both server and client package.json files
COPY ./server/package*.json ./server/
COPY ./client/package*.json ./client/

# Install dependencies for both server and client
RUN cd ./server && npm install
RUN cd ./client && npm install

# Copy the rest of the application code for both server and client
COPY ./server ./server/
COPY ./client ./client/

# Expose the ports
EXPOSE 3000
EXPOSE 3001

# Change the working directory to /app/server
WORKDIR /app/server

# Start the server and client concurrently
CMD ["npm", "run", "start-concurrently"]