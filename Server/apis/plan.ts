import * as express from "express"
import {createPlan,currentMonthPlans,todayPlan} from "../controllers/plan"
import asyncHandler from "../middlewares/asyncErrorHandler"

const router = express.Router()

router.route("/new-plan")
  .post(asyncHandler(createPlan))
router.route("/today")
  .get(asyncHandler(todayPlan))
router.route("/current-month")
  .get(asyncHandler(currentMonthPlans))

export default router