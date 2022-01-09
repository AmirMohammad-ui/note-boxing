import * as express from "express";
import {
  completePlan,
  createPlan,
  currentMonthPlans,
  deletePlans,
  newCategory,
  getCategories,
  todayPlan,
  yearlyPlans,
  currentYearPlans,
  monthlyPlans,
  dailyPlan,
  deletePlan,
} from "../controllers/plan.controller";
import asyncHandler from "../utils/errorHandler.util";

const router = express.Router();

router.route("/new-plan").post(asyncHandler(createPlan));
router.route("/today").get(asyncHandler(todayPlan));
router.route("/current-month").get(asyncHandler(currentMonthPlans));
router.route("/current-year").get(asyncHandler(currentYearPlans));
router.route("/delete-plans").delete(asyncHandler(deletePlans));
router.route("/new-category").post(asyncHandler(newCategory));
router.route("/categories").get(asyncHandler(getCategories));
router.route("/daily").get(asyncHandler(dailyPlan));
router.route("/monthly").get(asyncHandler(monthlyPlans));
router.route("/yearly").get(asyncHandler(yearlyPlans));
router.route("/delete").delete(asyncHandler(deletePlan));
router.route("/complete/:id").get(asyncHandler(completePlan));
export default router;
