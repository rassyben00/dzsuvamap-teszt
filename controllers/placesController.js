// controllers/placesController.js

const { Console } = require('console');
const data = require('../data/data.json');
const menuItems = require('./menuItemController');
const fs = require('fs');
const mongoose=require('mongoose');
const dbURI="mongodb+srv://bencici:TheSimpleMan2002@dzsuvamap.um4aspg.mongodb.net/";
const DBCommentsURI="mongodb+srv://bencici:TheSimpleMan2002@comments.um4aspg.mongodb.net/";
const data2=require('../models/data')
const comments=require('../models/comments')

mongoose.connect(dbURI).then((result)=>console.log("Map site connected to DB"))
//mongoose.connect(DBCommentsURI).then((result)=>console.log("Map site comments connected to DB"))

const dbComments = mongoose.createConnection(DBCommentsURI, { useNewUrlParser: true, useUnifiedTopology: true });
dbComments.on('error', err => console.error("Error connecting to comments database:", err));
dbComments.once('open', () => console.log("Map site comments connected to DB"));


exports.addComment = async (req, res) => {
  const { markerId } = req.params;
  const { text } = req.body;
 
  try {
    const newComment = new comments({ markerId, text });
    await newComment.save();
    res.redirect('/');
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).send('Error adding comment');
  }
};

async function generateUniqueId() {
  try {
    const maxId = await data2.findOne({}, { id: 1 }, { sort: { id: -1 } });
    return maxId ? maxId.id + 1 : 1;
  } catch (error) {
    console.error('Error generating unique ID:', error);
    return null;
  }
}

exports.getIndex = async(req, res) => {
  const allPlaces = await data2.find();
  const allComments = await comments.find()

  res.render('index', { apiKey: `${process.env.API_KEY}`, places: allPlaces, comments: allComments, menuItems});
};


exports.updateVisibility = async(req, res) => {
  const places = await data2.find();

  const updatedData=places.map(place=>{
    if(place.id==req.body.placeId){
      place.isVisible=!place.isVisible;
    }
    return place})
    
    const savePromises = updatedData.map(async (place) => await place.save());
    await Promise.all(savePromises);

  res.redirect('/admin');
};

const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

exports.addPlace = async(req, res) => {
  const newPlaceId = await generateUniqueId();
  const newPlace2=new data2({
    id: newPlaceId,
    placename: req.body.placename,
    description: req.body.description,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    cost: req.body.cost,
    date: req.body.date,
    isVisible: false,
  })

  await newPlace2.save();
  res.redirect("/");
};

