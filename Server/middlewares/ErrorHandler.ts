
import { Response } from "express"
import ErrorHandler from "../utilities/ErrorHandler"

const notFound=(req,res,next,err:ErrorHandler) => {
  res.status(404).json({
    success: 0,
    status: err.message,
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack,
    name: err.name
  })
}
const serverError = (req,res,next,err: ErrorHandler) => {
  res.status(500).json({

  })
}
export default function(req,res:Response,next,err) {
  if(err.statusCode === 404) {
    return notFound(req,res,next,err)
  }
  return serverError(req,res,next,err)
}