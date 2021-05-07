const Plan = require("../controllers/plan")
const express = require("express")
const router = express.Router()

router.route("/new-plan")
  .post(Plan.createPlan)




module.exports = router