import * as passport from "passport";
import * as express from "express";
import asyncHandler from "../utils/errorHandler.util";

const router = express.Router();

// GOOGLE
router.route("/auth/google").get(
  asyncHandler(
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  )
);
router.route("/auth/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  }),
  asyncHandler((req, res, next) => {
    console.log(req.query);
    res.send("User authenticated.");
  })
);

// GITHUB
router.route("/auth/github").get(
  asyncHandler(
    passport.authenticate("github", {
      scope: ["user:email"],
    })
  )
);
router.route("/auth/github/callback").get(
  passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/",
  }),
  asyncHandler((req, res, next) => {
    console.log(req.query);
    res.send("User authenticated.");
  })
);
export default router;
