import * as express from "express"
const router = express.Router()
import {signUp} from "../controllers/user.controller"
import asyncErrorHandler from "../utils/errorHandler.util"

router.route("/new-user")
  .post(asyncErrorHandler(signUp))

export default router
