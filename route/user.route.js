const express = require("express");
const { Login, Register, getUsers } = require("../controller/user.contorller");
const router = express.Router();
router.get("/", getUsers);
router.post("/", Register);
router.post("/login", Login);
module.exports = router