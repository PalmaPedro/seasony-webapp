/**
 * @file This file is the main entry point for the server-side code of the application.
 *       Main responsabilities are:
 *       Server setup.
 *       Connection to mongodb (nosql database).
 *       Handling incoming connections from remote devices.
 */

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const helmet = require('helmet');
const socketio = require('socket.io');
const http = require('http');
const connectDB = require('./config/db.js');
const errorHandler = require('./middleware/error.js');
const Device = require('./models/Device');

/**
 * Load .env variables
 */
dotenv.config({ path: './backend/config/config.env' });

/**
 *  This function connects the application to the database by
 *  making the configuration  file (db.js) accessible through
 *  this server.js file
 */
connectDB();

/**
 * Route files
 */
const devices = require('./routes/devices.js');
const tasks = require('./routes/tasks.js');

/**
 *
 */
const app = express();
//app.use(morgan('tiny'));  un-comment to have http requests logged 
const server = http.createServer(app);
const io = socketio(server);

app.use(helmet());

/**
 *
 */
app.use(express.json());

/**
 *Setup custom middleware to handle socket connection
 */
app.use((req, res, next) => {
  req.io = io;
  next();
});

/**
 * Server handles incoming connections from a remote device
 */
io.on('connection', (socket) => {
  console.info('Device connecting:'.yellow.bold);
  console.info(`socketID=${socket.id}`);
  // Server validates device id by...
  socket.on('deviceID', (deviceID) => {
    console.info(`deviceID=${deviceID}`);
    // ...finding device in db...
    Device.countDocuments({ _id: deviceID }, (err, count) => {
      if (count > 0) {
        console.info('Device found in database!'.underline.yellow);
        // ...and then updates device status and socketid in db
        Device.findOneAndUpdate(deviceID, {
          $set: { status: 'connected', socketID: socket.id },
        }).exec((err, docs) => {
          if (err) {
            console.log(err);
          } else {
            console.info('Status updated to connected!'.bold);
          }
        });
      } else {
        console.info(
          'No device found in database with given id!'.underline.red
        );
      }
    });
    // Device disconnects
    socket.on('disconnect', () => {
      console.info('Device disconnected'.yellow.bold);
      // remove socketid from db and update status to disconnected
      Device.findOneAndUpdate(deviceID, {
        $set: { status: 'disconnected', socketID: '' },
      }).exec((err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.info('Status updated to disconnected!'.bold);
        }
      });
    });
  });
});

/**
 * Mount routers
 */
app.use('/api/v1/devices', devices);
app.use('/api/v1/tasks', tasks);

/**
 *   
 */
app.use(errorHandler);

/**
 *
 */
const PORT = process.env.PORT;

/**
 * Server is running
 */
server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

/**
 * Handle unhandled promise rejections
 */
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});