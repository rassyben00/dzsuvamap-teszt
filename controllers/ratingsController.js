const mongoose=require('mongoose');
const DBRatingsURI="mongodb+srv://bencici:TheSimpleMan2002@ratings.um4aspg.mongodb.net/";
const ratings=require('../models/ratings')

const dbRatings = mongoose.createConnection(DBRatingsURI, { useNewUrlParser: true, useUnifiedTopology: true });
dbRatings.on('error', err => console.error("Error connecting to comments database:", err));
dbRatings.once('open', () => console.log("MAP site connected to RATINGS DB"));

exports.addRating= async(req,res)=>{
    const {markerId, rating} = req.body;
    try {
      const newRating = new ratings({ markerId, rating });
      await newRating.save();
      res.redirect('/');
    } catch (err) {
      console.error('Error adding rating:', err);
      res.status(500).send('Error adding rating');
    }
  }

