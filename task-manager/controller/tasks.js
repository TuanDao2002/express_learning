const Task = require('../model/Task');

const getAllTasks = (req, res) => {
    res.send('all items');
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch(error) {
        res.status(500).json({ msg: error });
    }
}

const getTask = (req, res) => {
    
}

const updateTask = (req, res) => {

}

const deleteTask = (req, res) => {

}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}