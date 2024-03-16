// router/placesRouter.js

const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');

router.get('/', placesController.getIndex);

router.post('/updateVisibility', placesController.updateVisibility);
router.post('/addPlace', placesController.addPlace);
router.post('/add-comment/:markerId', placesController.addComment);

module.exports = router;
