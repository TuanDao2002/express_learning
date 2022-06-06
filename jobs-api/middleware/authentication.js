const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");

const auth = (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Authentication invalid");
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // attach the user to the job routes
        // (the name does not need to be included in request body, only use user ID for the job routes)
        // do not need to attach the whole user object to request body as there is no delete operation on user
        req.user = { userId: payload.userId, name: payload.name };
        next(); // if the token is valid, move to the jobs controllers
    } catch (error) {
        throw new UnauthenticatedError("Authentication failed");
    }
};

module.exports = auth;
