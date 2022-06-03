const asyncWrapper = (fn) => { // this function will wrap a request handler function in a try-catch
    return async (req, res, next) => { // the format of a normal middleware function
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error); // if there is error in this function, pass the error to the next middleware function (in app.js)
        }
    };
};

module.exports = asyncWrapper;
