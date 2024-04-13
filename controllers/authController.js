// controllers/authController.js
require('dotenv').config();

const users = [
    { username: `${process.env.UNAME}`, password: `${process.env.PW}` }
  ];

  exports.getLogin = (req, res) => {
    res.render('login', {error: null});
  };
  
  exports.postLogin = (req, res) => {
    const { username, password } = req.body;
  
    // Check credentials
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      req.session.user = user;
      res.redirect('/admin');
    } else {
      res.render('login', { error: 'Invalid username or password. Try again.' });
    }
  };
  
  exports.getLogout = (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  };
  