import { Request, Response } from "express"
import { PlanTypes, Progress ,NewPlan,File} from "../types/plan"
import * as path from "path"
import Plan , {validateData,Category} from "../models/plan"
import ErrorHandler from "../utilities/ErrorHandler"
import isDefined from "../utilities/isDefined"


// POST /new-plan
export const createPlan = async(req:Request,res:Response,next) => {
  const data = req.body as NewPlan
  const validation = validateData(req.body)
  const {errors,isValid} = validation
  if(!isValid){
    res.status(400).json({
      success: 0,
      message: "Input validation failed.", 
      errors
    })
    return
  }
  let IMG;
  if(req.files.image) {
    const image = req.files.image as File
    const imageFileName = `image-${Date.now()}.${image.mimetype.split("/")[1]}`
    await image.mv(path.join(__dirname,'../uploads/images/',imageFileName))
    IMG = imageFileName
  }
  const newPlan = await Plan.create({
    ...data,
    status: Progress.IN_PROGRESS,
    image: IMG || "default.png",
    dateCreated: new Date()
  })
  await Category.findOne({ name: data.category }, async(err,category)=> {
    if(err || !category) return next(new ErrorHandler("Category selected does not exist, You need to create it first.",400))
    category.plans.push(newPlan._id)
    await category.save()
  })
  console.log(newPlan)
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
export const yearlyPlans = async(req:Request, res:Response,next) => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const plans = await Plan.find({"startDate.year": {$gte:currentYear,$lte: currentYear+10}})
  res.status(200).json({
    success: 1,
    message: plans.length > 0 ? `Found ${plans.length} plans.`:"No plan found.",
    data: plans
  })
}
// GET /categories
// DELETE /delete-plans
export const deletePlans = async(req:Request,res:Response,next) => {
  await Plan.deleteMany({})
  res.status(200).json({
    success: 1,
    message: "Deleted all plans successfully."
  })
}
// POST /new-category
export const newCategory = async(req:Request,res:Response,next) => {
  const {category} = req.body
  const trimmedCategory = category.trim().toLowerCase()
  if(!trimmedCategory) return next(new ErrorHandler("'New Category' field is required.",400)) 
  if(trimmedCategory.length < 3) return next(new ErrorHandler("'New Category' field must be at least 3 characters long.",400))
  if(trimmedCategory.length > 50) return next(new ErrorHandler("'New Category' field cannot exceed 50 characters long.",400))
  if(await Category.findOne({name: trimmedCategory})) return next(new ErrorHandler("This category already exists.",400))
  const createdCategory = await Category.create({
    name: trimmedCategory,
  })
  console.log(createdCategory)
  res.status(201).json({
    success: 1,
    message: "New category created successfully."
  })
}

export const getCategories = async(req:Request,res:Response,next) => {
  const categories = await Category.find().select("name _id").sort("1")
  if(!categories || categories.length === 0) return next(new ErrorHandler("No Categories have been created yet.",404))
  res.status(200).json({
    succuss: 1,
    message: "Categories fetched successfully",
    categories
  })
}