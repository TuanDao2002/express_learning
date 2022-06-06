const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");

const register = async (req, res) => {
    const user = await User.create({ ...req.body }); // spread operator
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {};

module.exports = { register, login };
