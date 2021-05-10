import Plan from "../models/Plan"
// CREATING NEW PLAN
export const createPlan = async(req,res) => {
  const data = req.body

  console.log(req.files.image)
  console.log(data)
  const plan = await Plan.create(data)
  res.status(201).json({
    succuss: 1,
    message: "Plan successfully created."
  })
}
