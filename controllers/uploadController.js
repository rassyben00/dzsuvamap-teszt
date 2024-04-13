// controllers/uploadController.js
const mongoose=require('mongoose');
const dbURI="mongodb+srv://bencici:TheSimpleMan2002@dzsuvamap.um4aspg.mongodb.net/";
const data2=require('../models/data')
const menuItems = require('./menuItemController'); // Import menu items

mongoose.connect(dbURI).then((result)=>console.log("UPLOAD site connected to MARKER DB"))

exports.getUpload = (req, res) => {
  res.render('upload', { menuItems,apiKey: `${process.env.API_KEY}`});
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
async function generateUniqueId() {
  try {
    const maxId = await data2.findOne({}, { id: 1 }, { sort: { id: -1 } });
    return maxId ? maxId.id + 1 : 1;
  } catch (error) {
    console.error('Error generating unique ID:', error);
    return null;
  }
}