const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  projectName:{
    type:String
  },
  projectImage: {
    type: String,
  },
  description:{
    type:String
  },
  isDeleted:{
    type:Boolean,
    default:0
  },
  motto:{
    type:String
  },
  place:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  NGO: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO'
  },
  projectstat:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status'
  }],
  numOfOpenings: {
    type: Number,
    default:0
  },
  remainingOpen:{
    type: Number,
    default:0
  }
})

module.exports = mongoose.model('Project', ProjectSchema)