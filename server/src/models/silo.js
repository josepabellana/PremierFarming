const mongoose = require('./index.js');

const siloSchema = mongoose.Schema({
  number:{
    type:Number,
    required:true
  },
  capacity:{
    type:Number,
    required:true
  },
  farm:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Farm",
    require:true
  },
  createdAt:{
    type: Date,
    default: Date.now 
  },
  updatedAt:{
    type: Date 
  }
});

module.exports = mongoose.model('Silo', siloSchema);