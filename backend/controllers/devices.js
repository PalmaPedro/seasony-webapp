/**
 * @file This file handles functions associated with the
 * resource 'devices'. This file includes all the logic for the
 *'devices' endpoints which are included in ./routes/devices.js.
 */

/**
 * ErrorResponse -
 * Device -
 * Task -
 * asyncHandler -
 */
const ErrorResponse = require('../utils/errorResponse.js');
const Device = require('../models/Device.js');
const Task = require('../models/Task.js');
const asyncHandler = require('../middleware/async.js');

/**
 *  @description Get all devices
 *  @route       GET /api/v1/devices
 *  @access      Public
 */
exports.getDevices = asyncHandler(async (req, res, next) => {
  //console.log(req.query);
  const devices = await Device.find().populate('tasks');
  return res
    .status(200)
    .json({ success: true, count: devices.length, data: devices });
});

/**
 *  @description Get a single device
 *  @route       GET /api/v1/devices/:id
 *  @access      Public
 */
exports.getDevice = asyncHandler(async (req, res, next) => {
  const device = await Device.findById(req.params.id);
  if (!device) {
    return next(
      new ErrorResponse(`Device not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: device });
});

/**
 *  @description Create a new device
 *  @route       POST /api/v1/devices
 *  @access      Public
 */
exports.createDevice = asyncHandler(async (req, res, next) => {
  const device = await Device.create(req.body);

  res.status(201).json({
    success: true,
    data: device,
  });
});

/**
 *  @description Update a device
 *  @route       PUT /api/v1/devices/:id
 *  @access      Public
 */
exports.updateDevice = asyncHandler(async (req, res, next) => {
  const device = await Device.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!device) {
    return next(
      new ErrorResponse(`Device not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: device });
});

/**
 *  @description Delete a device.
 *  @route       DELETE /api/v1/devices/:id
 *  @access      Public
 */
exports.deleteDevice = asyncHandler(async (req, res, next) => {
  const device = await Device.findByIdAndDelete(req.params.id);
  if (!device) {
    return next(
      new ErrorResponse(`Device not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});

/**
 * @description Assign a task to a device. This route will handle communication between the browser
 *              and a remote device. It will send a specific task assigned to the selected device
 *              (emits to ../device.js)
 * @route       PUT /api/v1/devices/run/:id
 * @access      Public
 */
exports.assignTaskToDevice = asyncHandler(async (req, res, next) => {
  const device = await Device.findById(req.params.id);

  if (!device) {
    return next(
      new ErrorResponse(`Device not found with id of ${req.params.id}`, 404)
    );
  }

  const task = await Task.findById(req.body.taskId);

  task.device = device.id;
  await task.save();

  // After updating db, task is sent to device
  // const socketID = req.body.socketID;
  const socketID = device.socketID;
  // const title = req.body.title;
  const title = task.title;

  req.io.to(socketID).emit('task', title); // it will emit the task, knowing the socket id generated between a remote device and nodejs server
  console.info(`Task "${title}" sent to device`); // logs to the console the tile of the task sent to remote device
  res.status(200).json({ success: true, data: device }); // server response if successful
});