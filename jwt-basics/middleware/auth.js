const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        // check if the token exists or valid
        throw new UnauthenticatedError("No token provided");
    }

    const token = authHeader.split(" ")[1]; // get the token after "Bearer "
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token with JWT_SECRET key in .env
        const { id, username } = decoded;
        // create a "user" key in the request body, e.g. the request body contains user: { id: 5, username: 'tuan' }
        // (this is shorthand method)
        req.user = { id, username };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Not authorized to access this route");
    }
};

module.exports = authenticationMiddleware;
