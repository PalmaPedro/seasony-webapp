/**
 * @file This file defines the endpoints for the resource 'devices'. It accesses the 'controller' methods
 * which include all the logic to handle each specific enpoint
 */

/**
 * Brings in express and enables all routes defined here to be
 * mounted in the server.js file, which is the main entry point
 */
const router = require('express').Router();

/**
 * 'Controller' functions will be passed as parameters in every route   accordingly
 */
const {
    getDevices,
    getDevice,
    createDevice,
    updateDevice,
    deleteDevice,
    assignTaskToDevice
} = require('../controllers/devices.js');

// Include other resource routers
const taskRouter = require('./tasks');

// Re-route into other resource routers
router.use('/:deviceId/tasks', taskRouter);

router
    .route('/')
    .get(getDevices)
    .post(createDevice);

router
    .route('/:id')
    .get(getDevice)
    .put(updateDevice)
    .delete(deleteDevice);

router
    .route('/run/:id')
    .put(assignTaskToDevice);

/**
 * Export routes so they become accessible from the main entry
 * point, the server.js file
 */
module.exports = router;