import { Request, Response } from "express"
import { PlanTypes, Progress ,PlanSchema} from "../types/plan"
import * as path from "path"
import Plan from "../models/plan"
import ErrorHandler from "../utilities/ErrorHandler"
import isDefined from "../utilities/isDefined"

interface File {
  name: string
  mimetype: string
  size: number
  md5: string
  mv: Function
}

// POST /new-plan
export const createPlan = async(req:Request,res:Response,next) => {
  const data = req.body as PlanSchema
  const isDef = isDefined(data)
  if(!isDef.isValid) return next(new ErrorHandler(`${isDef.errors.join(", ")} are required.`))
  if(req.files.image) {
    const image = req.files.image as File
    const imageFileName = `image-${Date.now()}.${image.mimetype.split("/")[1]}`
    console.log(image)
    console.log(imageFileName)
    await image.mv(path.join(__dirname,'../uploads/images/',imageFileName))
    data.image = imageFileName
  }
  const newPlan = await Plan.create({
    ...data,
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
// GET /current-year
// GET /daily
// GET /monthly
// GET /yearly

// GET /categories
