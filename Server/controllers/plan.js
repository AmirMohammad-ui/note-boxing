const Plan = require("../models/Plan")

exports.createPlan = async (res, req) => {
  const plan = await Plan.create({})
  console.log(plan)
  res.status(201).json({
    succuss: 1,
    message: "Plan successfully created."
  })
}
