const Plan = require("../controllers/plan")
const asyncHandler = require("../middlewares/asyncErrorHandler")
const express = require("express")
const router = express.Router()

router.route("/new-plan")
  .post(asyncHandler(Plan.createPlan))




module.exports = router