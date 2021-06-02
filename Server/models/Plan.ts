import * as mongoose from "mongoose"
import {PlanTypes,Progress} from "../types/plan"
import { Schema as ValidateSchema } from "valivar"
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
// schema.methods.validate = (data) => {
//   const newPlan = new ValidateSchema({
//     title: {
//       type: String,
//       required: true,
//       message: {
//         type: "Title must be of type string.",
//         required: "Title is required."
//       }
//     },
//     description: {
//       type: String,
//       required: true,
//       message: {
//         type: "Description must be of type string.",
//         required: "Description is required."
//       }
//     },
//     startDate_date: {
//       type: Number,
//       required: true,
//       messgae: {
//         tyep: "startDate_date must be of type number.",
//         required: "startDate_date is required."
//       }
//     },
//     startDate_month: {
//       type: Number,
//       required: true,
//       messgae: {
//         tyep: "startDate_month must be of type number.",
//         required: "startDate_month is required."
//       }
//     },
//     startDate_year: {
//       type: Number,
//       required: true,
//       messgae: {
//         tyep: "startDate_year must be of type number.",
//         required: "startDate_year is required."
//       }
//     },
//     endDate_date: {
//       type: Number,
//       required: true,
//       messgae: {
//         tyep: "endDate_date must be of type number.",
//         required: "endDate_date is required."
//       }
//     },
//     endDate_month: {
//       type: Number,
//       required: true,
//       messgae: {
//         tyep: "endDate_month must be of type number.",
//         required: "endDate_month is required."
//       }
//     },
//     endDate_year: {
//       type: Number,
//       required: true,
//       messgae: {
//         tyep: "endDate_year must be of type number.",
//         required: "endDate_year is required."
//       }
//     },
//     priority: {
//       type: Number,
//       required: true,
//       messgae: {
//         tyep: "Priority must be of type number.",
//         required: "Priority is required."
//       }
//     },
//     category: {
//       type: String,
//       required: true,
//       messgae: {
//         tyep: "Category must be of type string.",
//         required: "Category is required."
//       }
//     },
//     type: {
//       type: String,
//       required: true,
//       messgae: {
//         tyep: "Type must be of type string.",
//         required: "Type is required."
//       }
//     }
//   })
//   const errors = newPlan.validate(data)
//   return errors
// }

const Plan = mongoose.model("plan", schema)


export default Plan
