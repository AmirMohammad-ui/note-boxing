// const Plan = require("../models/Plan")
// CREATING NEW PLAN
exports.createPlan = (req,res) => {
  const data = req.body
  console.log(req.files.image)
  console.log(data)
  // const plan = await Plan.create(data)
  res.status(201).json({
    succuss: 1,
    message: "Plan successfully created."
  })
}
