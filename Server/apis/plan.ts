import * as express from "express"
import {createPlan,currentMonthPlans,deletePlans,todayPlan, yearlyPlans} from "../controllers/plan"
import asyncHandler from "../middlewares/asyncErrorHandler"

const router = express.Router()

router.route("/new-plan")
  .post(asyncHandler(createPlan))
router.route("/today")
  .get(asyncHandler(todayPlan))
router.route("/current-month")
  .get(asyncHandler(currentMonthPlans))
router.route("/yearly")
  .get(asyncHandler(yearlyPlans))
router.route("/delete-plans")
  .delete(asyncHandler(deletePlans))

export default router