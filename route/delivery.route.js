const express = require("express");

const router = express.Router();

const { getDelivery, getDeliveries, createDelivery, updateDelivery, deleteDelivery } = require("../controller/delivery.controller");

router.get("/", getDeliveries);
router.get("/:delivery_id", getDelivery);
router.post("/", createDelivery);
router.put("/:delivery_id", updateDelivery);
router.delete("/:delivery_id", deleteDelivery);

module.exports = router