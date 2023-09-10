const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  emailId:{
    type: String,
    required: true,
  },
  resetotp:{
    type: String
  },
  password:{
    type:String
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Admin', AdminSchema)