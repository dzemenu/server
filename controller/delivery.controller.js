const Delivery = require('../model/delivery.model');

const createDelivery = async (req, res) => {
    try {
        const { delivery_id, package_id, pickup_time, start_time, end_time, location, status } = req.body;
        const newDelivery = new Delivery({ delivery_id, package_id, pickup_time, start_time, end_time, location, status });
        const result = await newDelivery.save();
        if (result) {
            return res.send(result);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const getDelivery = async (req, res) => {
    try {
        const { delivery_id } = req.params;
        const delivery = await Delivery.findOne({ delivery_id });
        res.status(200).json(delivery);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const getDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        res.status(200).json(deliveries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const updateDelivery = async (req, res) => {
    try {
        const { delivery_id } = req.params;
        const { pickup_time, start_time, end_time, location, status } = req.body;
        const delivery = await Delivery.findOne({ delivery_id });
        delivery.pickup_time = pickup_time;
        delivery.start_time = start_time;
        delivery.end_time = end_time;
        delivery.location = location;
        delivery.status = status;
        const result = await delivery.save();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const deleteDelivery = async (req, res) => {
    try {
        const { delivery_id } = req.params;
        const result = await Delivery.deleteOne({ delivery_id });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
module.exports = {
    createDelivery,
    getDelivery,
    getDeliveries,
    updateDelivery,
    deleteDelivery
}   