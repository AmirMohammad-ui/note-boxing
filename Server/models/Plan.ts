import * as mongoose from "mongoose"
import {NewPlan, PlanTypes,Progress} from "../types/plan"
const Schema = mongoose.Schema
import * as Validator from "validatorjs"

interface PlanDocument extends PlanData , mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
export interface PlanModel extends mongoose.Model<PlanDocument> {
  validateData(data:NewPlan):ValidationResult;
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
    ],
    required: true
  },
  status: {
    type: String,
    enum: [
      Progress.IN_PROGRESS,
      Progress.FINISHED
    ],
    required: [true, 'Status is required.']
  },
  image: {
    type: String,
    required: [true, 'Image is required.']
  }
},{
  timestamps: true,
  storeSubdocValidationError: false
})

let date = new Date()
const currYear = date.getFullYear();
const currMonth = date.getMonth()+1;
const currDate = date.getDate()

interface ErrMsg {
  type: string,
  invalid_part?: string | number,
  field: string,
  message: string
}

export interface PlanData {
  title: string;
  description: string;
  startDate: {
    date: number;
    month: number;
    year: number;
  },
  endDate: {
    date: number;
    month: number;
    year: number;
  },
  priority: number;
  category: string;
  type: string;
  status: string;
  image: string;
}
interface ValidationResult {
  errors: any[];
  isValid: boolean
}

const rules = {
  title: "required|string",
  description: "required|string",
  startDate_date: `required|numeric|max:31|min:${currDate}`,
  startDate_month:`required|numeric|max:12|min:${currMonth}`,
  startDate_year:`required|numeric|min:${currYear}`,
  endDate_date:"required|numeric|max:31|min:1",
  endDate_month:"required|numeric|max:12|min:1",
  endDate_year:`required|numeric|min:${currYear}`,
  priority: "required|numeric|min:1",
  category: "required|string",
  type: `required|string|in:${PlanTypes.DAILY},${PlanTypes.MONTHLY},${PlanTypes.YEARLY}`
}

const customErrMsg = {
  required: ":attribute is required.",
  string: ":attribute must be a string.",
  number: ":attibute must be a number.",
  max: "Maximum value for :attribute is :max.",
  min: "Minimum number for :attribute is :min.",
  in: ":attribute must be one of the following list of values: :in."
}

export const validateData = (data: NewPlan):ValidationResult => {
  const validation = new Validator(data,rules,customErrMsg)
  const isValid = validation.passes()
  return {
    isValid,
    errors: validation.errors.all()
  }
}

export default mongoose.model("plan", schema)



