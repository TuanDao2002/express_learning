const Task = require("../model/Task");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}); // the condition is empty so all documents will be retrieved
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params; // get id from request param by object destructuring
        const task = await Task.findOne({ _id: taskID }); // find the document matched with the required id

        if (!task) {
            return res.status(404).json({ msg: `No task with ID: ${taskID}` }); // return immediately the error message, not the success status
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true, // always return the new updated object
            runValidators: true, // always validate the attributes of the object
            useFindAndModify: false // not show warning message
        });

        if (!task) {
            return res.status(404).json({ msg: `No task with ID: ${taskID}` }); // return immediately the error message, not the success status
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID }); // find the require ID and delete it

        if (!task) {
            return res.status(404).json({ msg: `No task with ID: ${taskID}` }); // return immediately the error message, not the success status
        }

        res.status(200).json({ task: null, status: "success" }); // do not need to return the deleted object
        // can be: res.status(200).send()
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
};
