// routes/aboutRouter.js

const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

router.get('/', uploadController.getUpload);

module.exports = router;
