/**
 * @file This file will 'mock' a remote device connecting to the main server. This code or similiar would be
 *  running in a raspberry-pi belonging to a robot.
 *  Communication is established using websockets. 
 *  Important to note that each time a remote device connects to the main server, a new socketID will be generated
 *  to define the current connection. In order to allow the main server to keep track of the device, even if connections
 *  are lost and re-established, a DeviceId is passed to the main server, which uniquely identifies the device and it 
 *  will persit it in the database.
 *  For demonstration purposes the hardcoded deviceID matches the '_id' of the first device included in json data file
 *  for devices. 
 *  If one chooses to connect multiple devices to the server, different 'deviceID' must be passed here to match the 
 *  devices saved in the database   
 */


 /**
  *  Device asks server to connect at port 5000
  */
 const io = require('socket.io-client');
 const ioClient = io.connect('http://localhost:5000');
 
 /**
  * Device passes its ID to the nodejs server when it connects.
  * @type {string}
  */
 const deviceID = '5d713995b721c3bb38c1f5d0';
 ioClient.emit('deviceID', deviceID);
 
 /**
  * Device receives 'task' sent from server ( refers to 'assignTasToDevice' from ./controllers/devices.js )
  * The route which handles a task to be assigned and run by a device was triggered from the browser
  */
 ioClient.on("task", title => {
     console.info(`Device will run: "${title}"`);
 });