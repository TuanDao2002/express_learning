const notfound = (req, res) => { // this middleware does not receive error argument as error-handler.js
    res.status(404).send("Route does not exist");
};

module.exports = notfound;
