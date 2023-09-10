const mongoose = require('mongoose')

const StatusSchema = new mongoose.Schema({
  status:{
    type:Number,
    default:0
  },
  remarks:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  volunteer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Volunteer'
  }

})

module.exports = mongoose.model('Status', StatusSchema)