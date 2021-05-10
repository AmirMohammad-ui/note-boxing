import * as express from "express"
const router = express.Router()
import {signUp} from "../controllers/users"

router.get("/sign-up",signUp)

export default router