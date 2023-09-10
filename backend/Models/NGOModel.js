const mongoose = require('mongoose')

const NGOSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  emailId:{
    type: String,
    required: true,
  },
  otp:{
    type:String
  },
  displayName: {
    type: String,
  },
  firstName: {
    type: String
  },
  NGOName:{
    type:String
  },
  NGOImage:{
    type:String
  },
  image: {
    type: String,
  },
  rating:{
    type:Number,
  },
  password:{
    type:String
  },
  peopleRated:{
    type:Number,
  },
  address:{
    type:String
  },
  isValidated:{
    type:Number,
    default:0
  },
  contact:{
    type:String
  },
  description:{
    type:String
  },
  motto:{
    type:String
  },
  comment:{
    type: String
  },
  resetotp:{
    type: String
  },
  projects:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Project'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('NGO', NGOSchema)