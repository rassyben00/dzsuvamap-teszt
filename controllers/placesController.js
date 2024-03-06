// controllers/placesController.js

const data = require('../data/data.json');
const menuItems = require('./menuItemController');
const fs = require('fs');

function generateUniqueId() {
  return data.length > 0 ? Math.max(...data.map(place => place.id)) + 1 : 1;
}

exports.getIndex = (req, res) => {
  res.render('index', { apiKey: `${process.env.API_KEY}`, places: data, menuItems});
};

exports.updateVisibility = (req, res) => {
  const { id, isVisible } = req.body;

  const updatedData = data.map(place => {
    if (place.id === id) {
      place.isVisible = isVisible;
    }
    return place;
  });

  fs.writeFileSync('./data/data.json', JSON.stringify(updatedData, null, 2));

  res.sendStatus(200);
};

exports.addPlace = (req, res) => {
  const newPlace = req.body;

  // Add a unique ID to the new place
  newPlace.id = generateUniqueId();
  data.push(newPlace);
  fs.writeFileSync('./data/data.json', JSON.stringify(data, null, 2));

  res.redirect("/");
};

