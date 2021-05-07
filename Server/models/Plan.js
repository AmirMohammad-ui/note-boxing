const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required."]
  },
  description: {
    type: String,
    required: [true, 'Description is required.']
  },
  startDate: {
    type: Date,
    required: [true, 'StartDate is required.']
  },
  finishDate: {
    type: Date,
    required: [true, 'FisnishDate is required.']
  },
  status: {
    type: String,
    enum: [
      'in-progress', 'finished'
    ],
    required: [true, 'Status is required.']
  },
  image: {
    type: String,
    required: [true, 'Image is required.']
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
})


const Plan = mongoose.model("plan", schema)


module.exports = Plan
