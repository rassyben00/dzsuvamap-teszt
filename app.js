const express = require('express');
const app = express();
const session = require('express-session');
const dotenv = require('dotenv');
const placesRouter = require('./router/placesRouter');
const uploadRouter = require('./router/uploadRouter');
const adminRouter = require('./router/adminRouter');
const authRouter = require('./router/authRouter');
const notFoundRouter = require('./router/notFoundRouter');
const bodyParser = require('body-parser');

dotenv.config();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));

app.use('/', placesRouter);
app.use('/feltoltes', uploadRouter);
app.use('/admin', adminRouter);
app.use('/', authRouter);
app.use('*', notFoundRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
