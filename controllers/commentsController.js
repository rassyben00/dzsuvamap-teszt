const mongoose=require('mongoose');
const comments=require('../models/comments')
const DBCommentsURI="mongodb+srv://bencici:TheSimpleMan2002@comments.um4aspg.mongodb.net/";

const dbComments = mongoose.createConnection(DBCommentsURI, { useNewUrlParser: true, useUnifiedTopology: true });
dbComments.on('error', err => console.error("Error connecting to comments database:", err));
dbComments.once('open', () => console.log("MAP site connected to COMMENTS DB"));

exports.addComment = async (req, res) => {
    const { markerId } = req.params;
    const { text } = req.body;
   
    try {
      const newComment = new comments({ markerId, text });
      await newComment.save();
      res.redirect('/');
    } catch (err) {
      console.error('Error adding comment:', err);
      res.status(500).send('Error adding comment');
    }
  };