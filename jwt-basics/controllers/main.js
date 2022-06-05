const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors/index");

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequestError("Please provide email and password");
    }

    // demo only, normally provided by database
    const id = new Date().getDate();

    // keep payload small for better user experience (do not include confidential info such as password in the payload)
    // in production, use long, complex and hard to predict string values for JWT_SECRET key
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: "30d", // expiration day is 30 days
    });

    res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
    console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello, ${req.user.username}`, // get the username from the decoded token
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
};

module.exports = {
    login,
    dashboard,
};
