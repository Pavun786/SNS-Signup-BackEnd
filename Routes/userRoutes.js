const express = require("express");
const {Register,Login, GetAllUser} = require("../Controllers/userControllers");
const router = express.Router()

router.post("/register",Register)

router.post("/login",Login)

router.get("/all-users",GetAllUser)

module.exports = router;