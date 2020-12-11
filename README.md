# Seasony 

>Web application to connect remote devices with the browser.

## Features

The main goal of this application is to establish bi-directional communication between the browser and a remote device (robot), allowing a user to assign a task to it, from the browser.

This application was developed using the 'MERN' (MongoDB, Express, React and Nodejs) stack with Socket.io for real-time communication. A full list of all packages used in this project are listed below.

Two resources were implemented: devices and tasks

A user may create, update, delete and read 'tasks' and 'devices'. A user may then select a specific device, assign a task and send it to the selected device.

## Usage

To run the application make sure you have installed:
- nodejs -  https://nodejs.org/en/download/  (includes npm - Node package manager)
- mongodb - https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials

### Clone repo
```
git clone <repo url here>
```

You can update values in the config.env file, if not, server will run at port 5000 and database will run 
at localhost with the name 'seasonydb' (please make sure mongodb is installed in your machine and create a database
with a matching name)

If you wish to run the backend only, a collection of endpoints are included that can be imported to Postman (https://www.getpostman.com/) for testing http requests.

## NPM dependencies used
### Backend
- express -             https://github.com/expressjs/express
- mongoose -            https://github.com/Automattic/mongoose
- socketio -            https://github.com/socketio/socket.io
- socket.io-client  -   https://github.com/socketio/socket.io-client
- dotenv -              https://github.com/motdotla/dotenv#readme
- morgan -              https://github.com/expressjs/morgan 
- helmet -              https://github.com/helmetjs/helmet
- colors -              https://github.com/Marak/colors.js
- concurrently -        https://github.com/kimmobrunfeldt/concurrently
- nodemon -             https://github.com/remy/nodemon 

### Frontend
- react                 https://www.npmjs.com/package/react
- react-router-dom      https://www.npmjs.com/package/react-router-dom
- redux                 https://github.com/reduxjs/react-redux
- axios                 https://www.npmjs.com/package/axios
- uuid                  https://github.com/uuidjs/uuid
- redux-thunk

## Install Dependencies (frontend and backend)

```
npm install
cd frontend
npm install
```

## Run Application

```
# Run backend only
npm run server

# Open a second terminal and run (running this file will 'mock' a robot connecting to the nodejs server)
npm run device

# Or ...

# Run frontend(port 3000) and backend (port 5000)
npm run dev 

# Open a second terminal and run (running this file will 'mock' a robot connecting to the nodejs server)
npm run device

```

## Database Seeder

To load the database collections with json data from the "\_data" folder, run

```
# Move to backend folder
cd backend

# Delete all data
node seeder -d

# Import all data
node seeder -i
```



- Version: 1.0.0
