import { Request, Response } from "express";

export const signUp = (req: Request,res: Response) => {
  const data = req.body
  
  res.status(201).json({
    success: 1,
    message: "Your Account successfully created."
  })
}

