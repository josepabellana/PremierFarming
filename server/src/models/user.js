const mongoose = require('./index.js');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  farms:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Farm'
  }],
  requests:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Request'
  }],
  createdAt:{
    type: Date,
    default: Date.now 
  },
  updatedAt:{
    type: Date,
    default:null
  }
});

module.exports = mongoose.model('User', userSchema);