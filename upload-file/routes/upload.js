const express = require('express');
const router = express.Router();

const upload = require('../controllers/upload');

router.route('/upload').post(upload);

module.exports = router;