import * as mongoose from "mongoose"
const Schema = mongoose.Schema

export interface PlanSchema {
  title: string,
  description: string,
  startDate: Date,
  endDate: Date,
  category: string,
  type: string,
  status: string,
  image: string,
  dateCreated: Date
}

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
  endDate: {
    type: Date,
    required: [true, 'FisnishDate is required.']
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
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


export default Plan
