const mongoose = require('mongoose')

const VolunteerSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  emailId:{
    type: String,
    required: true 
  },
  password:{
    type:String
  },
  otp:{
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
  resetotp:{
    type: String
  },
  isValidated:{
    type: Number,
    default:0
  },
  comment:{
    type: String
  },
  hobby:[{
    type:String,
  }],
  skils:[{
    type:String
  }],
  previousWork:{
    type:String
  },
  statusP:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Status'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Volunteer', VolunteerSchema)