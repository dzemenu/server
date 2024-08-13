const express = require("express");
const { getPackage, getPackages, createPackage, updatePackage, deletePackage } = require("../controller/package.contorller");

const router = express.Router();
router.get("/", getPackages);
router.get("/:package_id", getPackage);
router.post("/", createPackage);
router.put("/:package_id", updatePackage);
router.delete("/:package_id", deletePackage);
module.exports = router