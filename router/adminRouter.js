const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    } else {
      res.redirect('/login');
    }
  };

router.get('/', requireLogin, adminController.getAdmin);
router.get('/logout', adminController.logout);
router.post('/updateVisibility', adminController.updateVisibility);

module.exports = router;
