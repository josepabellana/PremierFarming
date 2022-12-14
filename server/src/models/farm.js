const mongoose = require('./index.js');

const farmSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  lat:{
    type:Number,
    required: true,
  },
  lng:{
    type:Number,
    required: true,
  },
  silos:[{
    type:Object
  }],
  createdAt:{
    type: Date,
    default: Date.now 
  },
  updatedAt:{
    type: Date 
  }
});

module.exports = mongoose.model('Farm', farmSchema);