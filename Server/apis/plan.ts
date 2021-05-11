import * as express from "express"
import {createPlan,getPlans} from "../controllers/plan"
import asyncHandler from "../middlewares/asyncErrorHandler"

const router = express.Router()

router.route("/new-plan")
  .post(asyncHandler(createPlan))
router.route("/plans")
  .get(asyncHandler(getPlans))



export default router