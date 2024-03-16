const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const commentSchema = new Schema({
    markerId: {type: Number,required:true},
    text: { type: String, required: true },
    date2: {type: Date, required: true,default: Date.now()}
  });
  
  const Comment = mongoose.model('comments', commentSchema);

  module.exports=Comment