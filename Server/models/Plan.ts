import * as mongoose from "mongoose"
import {NewPlan, PlanTypes,Progress} from "../types/plan"
const Schema = mongoose.Schema
import * as Validator from "validatorjs"

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
    required: true,

  },
  endDate: {
    type: Date,
    required: true
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

interface ErrMsg {
  type: string,
  invalid_part?: string | number,
  field: string,
  message: string
}

interface ValidationResult {
  errors: any[];
  isValid: boolean
}

const rules = {
  title: "required|string",
  description: "required|string",
  startDate: `required|date|startDate`,
  endDate: `required|date|endDate`,
  priority: "required|numeric|min:1",
  category: "required|string",
  type: `required|string|in:${PlanTypes.DAILY},${PlanTypes.MONTHLY},${PlanTypes.YEARLY}`
}

const customErrMsg = {
  required: ":attribute is required.",
  string: ":attribute must be a string.",
  numeric: ":attibute must be a number.",
  max: "Maximum value for :attribute is :max.",
  min: "Minimum number for :attribute is :min.",
  in: ":attribute must be one of the following list of values: :in."
}

export const validateData = (data: NewPlan):ValidationResult => {
  if(data.startDate && data.endDate) {
    const the_entered_startDate: Date = new Date(data.startDate);
    const the_entered_endDate: Date = new Date(data.endDate);
    const fullDate: Date = new Date(new Date().toLocaleDateString("en-US"))
    // After or Equal endDate
    Validator.register("endDate", ()=> {
      return the_entered_endDate >= fullDate && the_entered_endDate >= the_entered_startDate  
    },`Your chosen date for 'end Date' must be after ${fullDate.toLocaleDateString("en-US")} and ${the_entered_startDate.toLocaleDateString("en-US")}.`)
    // After or Equal startDate
    Validator.register("startDate", ()=> {
      return the_entered_startDate >= fullDate && the_entered_startDate <= the_entered_endDate
    },`Your chosen date for 'start Date' must be after ${fullDate.toLocaleDateString("en-US")} and before ${the_entered_endDate.toLocaleDateString("en-US")}.`)
  }
  const validation = new Validator({
    ...data,
  },rules,customErrMsg)
  const isValid = validation.passes()
  return {
    isValid,
    errors: validation.errors.all()
  }
}

export default mongoose.model("plan", schema)



