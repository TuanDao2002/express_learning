const express = require('express');
const router = express.Router();

const sendEmail = require('../controllers/sendingEmail');
router.route('/send').get(sendEmail);

module.exports = router;