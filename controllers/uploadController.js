// controllers/aboutController.js

const menuItems = require('./menuItemController'); // Import menu items

exports.getUpload = (req, res) => {
  res.render('upload', { menuItems,apiKey: `${process.env.API_KEY}`});
};
