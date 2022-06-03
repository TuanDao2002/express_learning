const Task = require("../model/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params; // get id from request param by object destructuring
    const task = await Task.findOne({ _id: taskID }); // find the document matched with the required id

    if (!task) {
        return next(createCustomError(`No task with ID: ${taskID}`, 404)); // pass the Error object to next middleware function (error-handler.js)
    }

    res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true, // always return the new updated object
        runValidators: true, // always validate the attributes of the object
        useFindAndModify: false, // not show warning message
    });

    if (!task) {
        return next(createCustomError(`No task with ID: ${taskID}`, 404)); // pass the Error object to next middleware function (error-handler.js)
    }

    res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID }); // find the require ID and delete it

    if (!task) {
        return next(createCustomError(`No task with ID: ${taskID}`, 404)); // pass the Error object to next middleware function (error-handler.js)
    }

    res.status(200).json({ task: null, status: "success" }); // do not need to return the deleted object
    // can be: res.status(200).send()
});

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
};
