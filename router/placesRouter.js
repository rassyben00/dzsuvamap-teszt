// router/placesRouter.js
const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');
const commentsController = require('../controllers/commentsController');
const ratingsController = require('../controllers/ratingsController');

router.get('/', placesController.getIndex);

router.post('/add-comment/:markerId', commentsController.addComment);
router.post('/add-rating/:markerId', ratingsController.addRating);

module.exports = router;
