/**
 * @file Handles functions associated with the resource 'tasks'. This file
 * includes all the logic for the 'tasks' routes included in ./routes/tasks.js
 */

/**
 * ErrorResponse -
 * Task -
 * asyncHandler -
 */
const ErrorResponse = require('../utils/errorResponse.js');
const Task = require('../models/Task.js');
const asyncHandler = require('../middleware/async.js');

/**
 *  @description Get tasks
 *  @route       GET /api/v1/tasks
 *  @route       GET /api/v1/devices/:deviceId/tasks
 *  @access      Public
 */
exports.getTasks = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.deviceId) {
    query = Task.find({ device: req.params.deviceId }).populate({
      path: 'device',
      select: 'title status socketID',
    });
  } else {
    query = Task.find().populate({
      path: 'device',
      select: 'title status socketID',
    });
  }

  const tasks = await query;

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

/**
 * @description Get a single task
 * @route       Get /api/v1/tasks/:id
 * @access      Public
 */
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: task });
});

/**
 * @description Create a new task
 * @route       POST /api/v1/tasks
 * @access      Public
 */
exports.createTask = asyncHandler(async (req, res, next) => {
  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task,
  });
});

/**
 * @description  Update a task
 * @route        PUT /api/v1/tasks/:id
 * @access       Public
 * */
exports.updateTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: task });
});

/**
 *  @description Delete a task
 *  @route       DELETE /api/v1/tasks/:id
 *  @access      Public
 */
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const device = await Task.findByIdAndDelete(req.params.id);
  if (!device) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});