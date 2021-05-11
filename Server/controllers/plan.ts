import { Request, Response } from "express"
import * as path from "path"
import Plan from "../models/plan"
// CREATING NEW PLAN
interface File {
  name: string
  mimetype: string
  size: number
  md5: string
  mv: Function
}
export const createPlan = async(req:Request,res:Response) => {
  const data = req.body
  const image = req.files.image as File
  const imageFileName = `image-${Date.now()}.${image.mimetype.split("/")[1]}`
  console.log(image)
  console.log(imageFileName)
  await image.mv(path.join(__dirname,'../uploads/images/',imageFileName))
  // await Plan.create({
  //   ...data,
  //   image: imageFileName
  // })
  res.status(201).json({
    succuss: 1,
    message: "Plan successfully created."
  })
}

export const getPlans = async(req,res) => {
  // const data = await Plan.find({})
  const data = {
    name:"AmirMohammad",
    age: 20
  }
  console.log(data)
  res.status(200).json({
    success:1,
    PlansFound: 25,
    message: "Data successfully fetched.",
    data
  })
}