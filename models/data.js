const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const dataSchema=new Schema({
    id: { type: Number, required: true },
    placename: { type: String, required: true },
    description: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    cost: { type: String, required: true },
    date: { type: Date, required: true },
    isVisible: { type: Boolean, required: true },
  });

  const data=mongoose.model('data',dataSchema)

  module.exports=data