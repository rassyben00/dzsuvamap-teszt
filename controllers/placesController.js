// controllers/placesController.js

const { Console } = require('console');
const data = require('../data/data.json');
const menuItems = require('./menuItemController');
const fs = require('fs');
const mongoose=require('mongoose');
const dbURI="mongodb+srv://bencici:TheSimpleMan2002@dzsuvamap.um4aspg.mongodb.net/";
const data2=require('../models/data')

mongoose.connect(dbURI).then((result)=>console.log("Map site connected to DB"))

//function generateUniqueId() {
 // return data2.length > 0 ? Math.max(...data2.map(place => place.id)) + 1 : 1;
//}

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

    //res.json(data);
    //console.log(allPlaces)
  res.render('index', { apiKey: `${process.env.API_KEY}`, places: allPlaces, menuItems});
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

  //newPlace.id = generateUniqueId();
  //data.push(newPlace);
  //fs.writeFileSync('./data/data.json', JSON.stringify(data, null, 2));

  res.redirect("/");
};

