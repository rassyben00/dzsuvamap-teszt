const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ratingSchema = new Schema({
    markerId: {type: Number,required:true},
    rating: { type: Number, required: true },
    date2: {type: Date, required: true,default: Date.now()}
  });
  
  const Rating = mongoose.model('ratings', ratingSchema);

  module.exports=Rating