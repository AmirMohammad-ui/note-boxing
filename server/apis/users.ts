import * as express from "express"
const router = express.Router()
import {signUp} from "../controllers/users"
import asyncErrorHandler from "../middlewares/asyncErrorHandler"

router.route("/new-user")
  .post(asyncErrorHandler(signUp))

export default router