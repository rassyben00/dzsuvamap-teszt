// controllers/placesController.js

const menuItems = require('./menuItemController');

const data2=require('../models/data')
const comments=require('../models/comments')
const ratings=require('../models/ratings')

exports.getIndex = async(req, res) => {
  const markerId = req.params.markerId;

  const allPlaces = await data2.find();
  const allComments = await comments.find()
  const allRatings = await ratings.find()

  res.render('index', { apiKey: `${process.env.API_KEY}`, places: allPlaces, comments: allComments, menuItems, ratings: allRatings, selectedMarkerId: markerId});
};


