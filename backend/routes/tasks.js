/**
 * @file This file defines the endpoints for the resource 'tasks'. It accesses the 'controller' methods
 * which include all the logic to handle each specific enpoint
 */

/**
 * Brings in express and enables all routes defined here to be
 * mounted in the server.js file, which is the main entry point
 */

const router = require('express').Router({ mergeParams: true });

const {
    getTasks, 
    getTask,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks.js');

router
    .route('/')
    .get(getTasks)
    .post(createTask);

router
    .route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);

/**
 * Export routes so they become available from the main entry point, the server.js file
 */
module.exports = router;