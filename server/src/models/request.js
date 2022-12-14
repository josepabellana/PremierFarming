const mongoose = require('./index.js');

const requestSchema = mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true,
  },
  farm:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Farm',
    required: true,
  },
  silos:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Silo',
    required: true,
  }],
  deliveryDate:{
    type:Date,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  amount:{
    type:Number,
    required:true
  },
  status:{
    type:String,
    required:true
  },
  comment: {
    type: String
  },
  createdAt:{
    type: Date,
    default: Date.now 
  },
  approvedAt:{
    type: Date
  },
  rejectedAt:{
    type: Date
  },
  updatedAt:{
    type: Date 
  }
});

module.exports = mongoose.model('Request', requestSchema);