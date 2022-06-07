const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }); // find all the jobs of a user with userId (which is attached to request body from token)
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
    const {
        user: { userId }, // get ID of user
        params: { id }, // get ID required to find of a Job
    } = req;

    const job = await Job.findOne({
        _id: id,
        createdBy: userId,
    });

    if (!job) {
        throw new NotFoundError(`No job with id ${id}`);
    }

    res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId; // assign the id of User to Job to form association between them
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
    const {
        body: { company, position }, // get new update company and position from request body
        user: { userId }, // get ID of user
        params: { id }, // get ID required to find of a Job
    } = req;

    if (company === "" || position === "") {
        throw new BadRequestError("Company or Position fields cannot be empty");
    }

    const job = await Job.findOneAndUpdate(
        { _id: id, createdBy: userId },
        req.body, // cannot use "body" as the "body" key is extracted yet
        { new: true, runValidators: true } // allow the Job Schema to validate all of its fields
    );

    if (!job) {
        throw new NotFoundError(`No job with id ${id}`);
    }

    res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
    const {
        user: { userId }, // get ID of user
        params: { id }, // get ID required to find of a Job
    } = req;

    const job = await Job.findByIdAndRemove({ _id: id, createdBy: userId });

    if (!job) {
        throw new NotFoundError(`No job with id ${id}`);
    }

    res.status(StatusCodes.OK).send(); // the return depends on front end
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
