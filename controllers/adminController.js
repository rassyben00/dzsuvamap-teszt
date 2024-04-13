const menuItems = require('./menuItemController'); // Import menu items
const mongoose=require('mongoose');
const dbURI="mongodb+srv://bencici:TheSimpleMan2002@dzsuvamap.um4aspg.mongodb.net/";
const data2=require('../models/data')

mongoose.connect(dbURI).then((result)=>console.log("ADMIN site connected to MARKER DB"))


exports.getAdmin = async(req, res) => {
  const allPlaces= await data2.find();
  res.render('admin', { menuItems,places: allPlaces });
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

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};