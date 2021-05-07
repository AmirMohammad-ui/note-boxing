module.exports = handler => {
  return async(req,res,next,err) => {
    try {
      await handler(req,res)
    } catch(err) {
      console.log(err.message)
      next(err)
    }
  }
}