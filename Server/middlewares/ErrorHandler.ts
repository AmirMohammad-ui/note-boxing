// import ErrorHandler from "../utilities/ErrorHandler"
import * as chalk from "chalk"

export default function(err,_,res,next) {
  console.log(chalk.red(err.status))
  console.log(chalk.magenta(err.message))
  console.log(chalk.cyan(err.name))
  res.status(404).json({
    success: 0,
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
    name: err.name,
    stack: err.stack
  })
}