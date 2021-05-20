import * as mongoose from "mongoose"
import {PlanTypes,Progress} from "../types/plan"
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
    date: {
      type: Number,
      required: [true, 'Date for startDate is required.']
    },
    month: {
      type: Number,
      required: [true, 'Month for startDate is required.']
    },
    year: {
      type: Number,
      required: [true, 'Year for startDate is required.']
    }
  },
  endDate: {
    date: {
      type: Number,
      required: [true, 'Date for startDate is required.']
    },
    month: {
      type: Number,
      required: [true, 'Month for startDate is required.']
    },
    year: {
      type: Number,
      required: [true, 'Year for startDate is required.']
    }
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [
      PlanTypes.DAILY, 
      PlanTypes.MONTHLY, 
      PlanTypes.YEARLY
    ] as string[],
    required: true
  },
  status: {
    type: String,
    enum: [
      Progress.IN_PROGRESS,
      Progress.FINISHED
    ] as string[],
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
