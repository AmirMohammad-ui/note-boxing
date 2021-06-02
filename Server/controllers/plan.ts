import { Request, Response } from "express"
import { PlanTypes, Progress ,NewPlan,File} from "../types/plan"
import * as path from "path"
import Plan from "../models/plan"
import ErrorHandler from "../utilities/ErrorHandler"
import isDefined from "../utilities/isDefined"

interface ErrMsg {
  type: string,
  invalid_part?: string | number,
  field: string,
  message: string
}

// POST /new-plan
export const createPlan = async(req:Request,res:Response,next) => {
  const data: NewPlan = req.body
  // const errors = Plan.validate(data)
  // console.log(errors)
  // const isDef = isDefined(data)
  // if(!isDef.isValid) return next(new ErrorHandler(`${isDef.errors.join(", ")} are required.`,400))
  // if(req.files.image) {
  //   const image = req.files.image as File
  //   const imageFileName = `image-${Date.now()}.${image.mimetype.split("/")[1]}`
  //   console.log(image)
  //   console.log(imageFileName)
  //   await image.mv(path.join(__dirname,'../uploads/images/',imageFileName))
  //   data.image = imageFileName
  // }
  const newPlan = await Plan.create({
    ...data,
    startDate: {
      date: data.startDate_date,
      month: data.startDate_month,
      year: data.startDate_year
    },
    endDate: {
      date: data.endDate_date,
      month: data.endDate_month,
      year: data.endDate_year
    },
    status: Progress.IN_PROGRESS,
    image: data.image || "default.png",
    dateCreated: new Date()
  })
  res.status(201).json({
    succuss: 1,
    message: "Plan successfully created.",
    data: newPlan
  })
}
// GET /today
export const todayPlan = async(req:Request,res:Response,next) => {
  const date = new Date()
  const todaysPlan = await Plan.findOne().and([
    {"startDate.date":date.getDate()},
    {"startDate.month":date.getMonth()+1},
    {"startDate.year":date.getFullYear()}
  ])
  if(!todaysPlan) return next (new ErrorHandler("There is no plan for today.",404))
  res.status(200).json({
    success: 1,
    message: "Data successfully fetched.",
    data:todaysPlan
  })
}

// GET /current-month
export const currentMonthPlans = async(req:Request,res:Response,next) => {
  const date = new Date()
  const currentMonth = date.getMonth() + 1
  const plans = await Plan.find({"startDate.month":currentMonth})
  console.log(plans)
  res.status(200).json({
    success: 1,
    message: "",
    data: plans
  })
}
// GET /current-year
export const currentYearPlans = async(req:Request,res:Response,next) => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const plans = await Plan.find({"startDate.year":currentYear})
  console.log(plans)
  res.status(200).json({
    success: 1,
    message: "",
    data: plans
  })
}
// GET /daily
export const dailyPlan = async(req:Request,res:Response,next) => {
  const date = new Date()
  const daily = date.getDate()
  const plans = await Plan.find({"startDate.date":daily})
  console.log(plans)
  res.status(200).json({
    success: 1,
    message: "",
    data: plans
  })
}
// GET /monthly
export const monthlyPlans = async(req:Request,res:Response,next) => {
  const date = new Date()
  const monthly = date.getMonth()
  const plans = await Plan.find({"startDate.month":monthly})
  console.log(plans)
  res.status(200).json({
    success: 1,
    message: "",
    data: plans
  })
}
// GET /yearly
// GET /categories
