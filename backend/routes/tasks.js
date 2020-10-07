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
 * @description Export routes so they become available from the main entry point, the server.js file
 */
module.exports = router;