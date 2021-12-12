export default handler => {
  return async(req,res,next) => {
    try {
      await handler(req,res,next)
    } catch(err) {
      console.log(err.message)
      next(err)
    }
  }
}