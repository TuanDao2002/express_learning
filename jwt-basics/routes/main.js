const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");

const authenticationMiddleware = require('../middleware/auth');

router.route('/dashboard').get(authenticationMiddleware, dashboard); // put the authentication middleware at this route specifically
router.route('/login').post(login);

module.exports = router;