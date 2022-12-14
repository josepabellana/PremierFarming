const mongoose = require('./index.js');

const feedSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  createdAt:{
    type: Date,
    default: Date.now 
  },
  updatedAt:{
    type: Date 
  }
});

module.exports = mongoose.model('Feed', feedSchema);