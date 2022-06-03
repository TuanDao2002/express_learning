const { CustomAPIError } = require("../errors/custom-error");

// the format of error middleware function
const errorHandlerMiddleware = (err, req, res, next) => {// receive the error from asyncWrapper - a previous middleware in app.js
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message }); // return the status and message of CustomAPIError object
    }

    return res.status(500).json({ msg: 'Something went wrong, please try again' }); // this error returned when the syntax of id is wrong
};

module.exports = errorHandlerMiddleware;
