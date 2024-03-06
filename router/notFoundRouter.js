// router/notFoundRouter.js

const express = require('express');
const router = express.Router();
const notFoundController = require('../controllers/notFoundController');

router.use(notFoundController.notFound);

module.exports = router;
