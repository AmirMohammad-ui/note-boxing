import {NextFunction, Request, Response} from "express";
import Users from "../models/users"
import ErrorHandler from "../utilities/ErrorHandler";

interface UserData {
  fname: string;
  lname: string;
  email: string;
  password: string,
  confirmPassword: string;
  plans: string[];
  phoneNumber: string
}
export const signUp = async (req : Request, res : Response,next) => {
  const {
    fname,
    lname,
    email,
    password,
    confirmPassword,
    plans,
  } : UserData = req.body

  const doesUserExist = await Users.findOne({
      "cridentials.email": email
    })

  if (doesUserExist) return next(new ErrorHandler("This Email already signed up. Please log in or register with another Email.", 400))
  
  const user = await Users.create({
    info: {
      fname,
      lname
    },
    cridentials: {
      email,
      password,
      confirmPassword,
    },
    plans
  })

  res.status(201).json({
    success: 1,
    data: user,
    message: "Your Account successfully created."
  })
}
