const express = require('express');
const router = express.Router();

const { 
    getAllTasks, 
    getTask, 
    createTask, 
    updateTask, 
    deleteTask 
} = require('../controller/tasks');

router.route('/')
    .get(getAllTasks)
    .post(createTask);

router.route('/:id')
    .get(getTask)
    .patch(updateTask) // patch instead of put for partial update
    .delete(deleteTask);

module.exports = router;