// import ErrorHandler from "../utilities/ErrorHandler"
import * as chalk from "chalk"

export default function(err,_,res,next) {
  console.log(chalk.yellow(err.statusCode))
  console.log(chalk.yellow(err.status))
  console.log(chalk.redBright(err.message))
  console.log(chalk.cyan(err.name))
  console.log(chalk.grey(err.stack))
  
  res.status(res.statusCode || 500).json({
    success: 0,
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
    name: err.name,
    stack: err.stack
  })
}