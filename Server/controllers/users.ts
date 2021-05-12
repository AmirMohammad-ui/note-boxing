import {Request, Response} from "express";
import Users from "../models/users"
export const signUp = async (req : Request, res : Response) => {
  const data = req.body
  const isExistUser = await Users.findOne({
    cridentials: {
      email: data.email
    }
  }).or({
    cridentials: {
      phoneNumber: data.phoneNumber
    }
  })
  if (isExistUser) {
    res.status(400).json({
      success: 0,
      message: "This email has already signed up. please login to your account."
    })
    return
  }
  const user = await Users.create(data)
  res.status(201).json({success: 1, data: user, message: "Your Account successfully created."})
}
