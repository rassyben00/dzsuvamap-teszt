const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

router.post('/addPlace', uploadController.addPlace);
router.get('/', uploadController.getUpload);

module.exports = router;
