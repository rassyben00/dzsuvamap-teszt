const menuItems = require('./menuItemController'); // Import menu items
const data = require('../data/data.json');

exports.getAdmin = (req, res) => {
  res.render('admin', { menuItems,places: data });
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

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};