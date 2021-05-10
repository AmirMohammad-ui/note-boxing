import * as express from "express"
import * as Plan from "../controllers/plan"
import asyncHandler from "../middlewares/asyncErrorHandler"

const router = express.Router()

router.route("/new-plan")
  .post(asyncHandler(Plan.createPlan))




export default router