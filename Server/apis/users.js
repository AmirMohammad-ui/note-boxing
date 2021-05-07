const express = require("express")
const router = express.Router()
const {signUp} = require("../controllers/users")

router.get("/sign-up",signUp)

module.exports = router