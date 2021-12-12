import { Request, Response } from "express";
import { PlanTypes, Progress, NewPlan, File } from "../types/plan";
import * as path from "path";
import Plan, { validateData, Category } from "../models/plan";
import ErrorHandler from "../utilities/ErrorHandler";
import {
  endOfYesterday,
  startOfTomorrow,
  startOfMonth,
  addYears,
  endOfMonth,
  endOfYear,
  startOfYear,
} from "date-fns";
// Putting plans together with the same date
enum ValidDateMethods {
  DATE = "getDate",
  MONTH = "getMonth",
  YEAR = "getFullYear",
}
const putTogether = (plans, method: ValidDateMethods) => {
  const organizedPlans = {};
  if (plans.length > 0) {
    const coppiedPlans = [...plans];
    plans.forEach((p1: any) => {
      const sameDayPlans = [p1];
      coppiedPlans.forEach((p2: any, i) => {
        if (
          new Date(p1.startDate)[method]() ===
            new Date(p2.startDate)[method]() &&
          p1._id !== p2._id
        ) {
          sameDayPlans.push(p2);
          coppiedPlans.splice(i, 1);
        }
      });
      organizedPlans[new Date(p1.startDate)[method]()] = sameDayPlans;
    });
  }
  return organizedPlans;
};
// POST /new-plan
export const createPlan = async (req: Request, res: Response, next) => {
  const data = req.body as NewPlan;
  const validation = validateData(req.body);
  const { errors, isValid } = validation;
  if (!isValid) {
    res.status(400).json({
      success: 0,
      message: "Input validation failed.",
      errors,
    });
    return;
  }
  let IMG;
  if (req.files.image) {
    const image = req.files.image as File;
    const imageFileName = `image-${Date.now()}.${image.mimetype.split("/")[1]}`;
    await image.mv(path.join(__dirname, "../uploads/images/", imageFileName));
    IMG = imageFileName;
  }
  const newPlan = await Plan.create({
    ...data,
    status: Progress.IN_PROGRESS,
    image: IMG || "default.png",
    dateCreated: new Date(),
  });
  await Category.findOne({ name: data.category }, async (err, category) => {
    if (err || !category)
      return next(
        new ErrorHandler(
          "Category selected does not exist, You need to create it first.",
          400
        )
      );
    category.plans.push(newPlan._id);
    await category.save();
  });
  res.status(201).json({
    succuss: 1,
    message: "Plan successfully created.",
    data: newPlan,
  });
};
// GET /today
export const todayPlan = async (req: Request, res: Response, next) => {
  const yesterday = endOfYesterday();
  const tomorrow = startOfTomorrow();
  const todaysPlan = await Plan.find({
    type: PlanTypes.DAILY,
    startDate: {
      $gte: yesterday,
      $lte: tomorrow,
    },
  });
  if (todaysPlan.length === 0)
    return next(new ErrorHandler("There is no plan for today.", 404));
  res.status(200).json({
    success: 1,
    length: todaysPlan.length,
    message: `Found ${todaysPlan.length} plans.`,
    plans: todaysPlan,
  });
};

// GET /current-month
export const currentMonthPlans = async (req: Request, res: Response, next) => {
  const startCurrentOfMonth = startOfMonth(new Date());
  const endCurrentOfMonth = endOfMonth(new Date());
  const plans = await Plan.find({
    type: PlanTypes.MONTHLY,
    startDate: {
      $gte: startCurrentOfMonth,
      $lte: endCurrentOfMonth,
    },
  });
  if (plans.length === 0)
    return next(new ErrorHandler("There is no plan for this month.", 404));
  res.status(200).json({
    success: 1,
    length: plans.length,
    message: `Found ${plans.length} plans.`,
    plans,
  });
};
// GET /current-year
export const currentYearPlans = async (req: Request, res: Response, next) => {
  const startCurrentOfYear = startOfYear(new Date());
  const endCurrentOfYear = endOfYear(new Date());
  const plans = await Plan.find({
    type: PlanTypes.YEARLY,
    startDate: {
      $gte: startCurrentOfYear,
      $lte: endCurrentOfYear,
    },
  });
  if (plans.length === 0)
    return next(new ErrorHandler("There is no plan for this year.", 404));
  res.status(200).json({
    success: 1,
    length: plans.length,
    message: `Found ${plans.length} plans.`,
    plans,
  });
};
// GET /daily
export const dailyPlan = async (req: Request, res: Response, next) => {
  let startCurrentOfMonth = startOfMonth(new Date());
  let endCurrentOfMonth = endOfMonth(new Date());
  if (req.query.date) {
    startCurrentOfMonth = startOfMonth(new Date(req.query.date as string));
    endCurrentOfMonth = endOfMonth(new Date(req.query.date as string));
  }
  const plans = await Plan.find({
    type: PlanTypes.DAILY,
    startDate: {
      $gte: startCurrentOfMonth,
      $lte: endCurrentOfMonth,
    },
  });
  if (plans.length === 0)
    return next(new ErrorHandler("No plan for today.", 404));
  const organizedPlans = putTogether(plans, ValidDateMethods.DATE);
  res.status(200).json({
    success: 1,
    message: `Found ${plans.length} plans.`,
    plans: organizedPlans,
  });
};
// GET /monthly
export const monthlyPlans = async (req: Request, res: Response, next) => {
  let startCurrentOfYear = startOfYear(new Date());
  let endCurrentOfYear = endOfYear(new Date());
  if (req.query.date) {
    startCurrentOfYear = startOfYear(new Date(req.query.date as string));
    endCurrentOfYear = endOfYear(new Date(req.query.date as string));
  }
  const plans = await Plan.find({
    type: PlanTypes.MONTHLY,
    startDate: {
      $gte: startCurrentOfYear,
      $lte: endCurrentOfYear,
    },
  });
  if (plans.length === 0)
    return next(new ErrorHandler("No monthly plan.", 404));
  const organizedPlans = putTogether(plans, ValidDateMethods.MONTH);
  res.status(200).json({
    success: 1,
    message: `Found ${plans.length} plans.`,
    plans: organizedPlans,
  });
};
// GET /yearly
export const yearlyPlans = async (req: Request, res: Response, next) => {
  let startCurrentOfYear = startOfYear(new Date());
  let endCurrentOfYear = addYears(startOfYear(new Date()), 10);
  if (req.query.date) {
    startCurrentOfYear = startOfYear(new Date(req.query.date as string));
    endCurrentOfYear = addYears(
      startOfYear(new Date(req.query.date as string)),
      10
    );
  }
  const plans = await Plan.find({
    type: PlanTypes.YEARLY,
    startDate: {
      $gte: startCurrentOfYear,
      $lte: endCurrentOfYear,
    },
  });
  if (plans.length === 0)
    return next(new ErrorHandler("No plan for 10 years ahead.", 404));
  const organizedPlans = putTogether(plans, ValidDateMethods.YEAR);
  res.status(200).json({
    success: 1,
    message: `Found ${plans.length} plans.`,
    plans: organizedPlans,
  });
};
// DELETE /delete-plans
export const deletePlans = async (req: Request, res: Response, next) => {
  await Plan.deleteMany({});
  res.status(200).json({
    success: 1,
    message: "Deleted all plans successfully.",
  });
};
// POST /new-category
export const newCategory = async (req: Request, res: Response, next) => {
  const { category } = req.body;
  const trimmedCategory = category.trim().toLowerCase();
  if (!trimmedCategory)
    return next(new ErrorHandler("'New Category' field is required.", 400));
  if (trimmedCategory.length < 3)
    return next(
      new ErrorHandler(
        "'New Category' field must be at least 3 characters long.",
        400
      )
    );
  if (trimmedCategory.length > 50)
    return next(
      new ErrorHandler(
        "'New Category' field cannot exceed 50 characters long.",
        400
      )
    );
  if (await Category.findOne({ name: trimmedCategory }))
    return next(new ErrorHandler("This category already exists.", 400));
  const createdCategory = await Category.create({
    name: trimmedCategory,
  });
  res.status(201).json({
    success: 1,
    message: "New category created successfully.",
  });
};

// GET /categories/:p
export const getCategories = async (req: Request, res: Response, next) => {
  let PAGE = 1;
  let LIMIT = 5;
  let categoriesPlans;
  const queries = req.query;
  if (queries.select === "name") {
    const categories = await Category.find().select("name _id").sort("1");
    if (!categories || categories.length === 0)
      return next(
        new ErrorHandler("No Categories have been created yet.", 404)
      );
    res.status(200).json({
      succuss: 1,
      message: "Categories fetched successfully",
      categories,
    });
    return;
  }
  if (typeof +queries.page === "number") {
    PAGE = +queries.page;
  }
  if (typeof +queries.limit === "number") {
    LIMIT = +queries.limit;
  }
  categoriesPlans = await Category.find()
    .sort("startDate")
    .skip((PAGE - 1) * LIMIT)
    .limit(LIMIT);
  if (queries.select) {
    const selectedFields = (queries.select as string).split(",").join(" ");
    categoriesPlans = await Category.find()
      .sort("startDate")
      .skip((PAGE - 1) * LIMIT)
      .limit(LIMIT)
      .select(selectedFields);
  }
  res.status(200).json({
    success: 1,
    length: categoriesPlans.length,
    message: `${categoriesPlans.length} categories found`,
    categories: categoriesPlans,
  });
};

// DELETE plan
export const deletePlan = async (req: Request, res: Response, next) => {
  const plan = await Plan.findByIdAndDelete(req.query.id);
  res.status(200).json({
    success: 1,
    message: "Plan succussfully deleted.",
    type: (plan as any).type,
  });
};

