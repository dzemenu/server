const Package = require('../model/package.model');
const createPackage = async (req, res) => {
    try {
        const { package_id, description, weight, width, height, depth, from_name, from_address, from_location, to_name, to_address, to_location, active_delivery_id } = req.body;
        const newPackage = new Package({
            package_id, description, weight, width, height, depth, from_name, from_address, from_location, to_name, to_address, to_location, active_delivery_id
        });
        const result = await newPackage.save();
        if (result) {
            return res.send(result);
        }
    } catch (err) {
        res.status * (500).json({ message: err.message });
    }

}
const getPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getPackage = async (req, res) => {
    try {
        const { package_id } = req.params;
        const package = await Package.findOne({ package_id }).populate('active_delivery_id')
        console.log(":dillu");
        res.status(200).json(package);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

}
const updatePackage = async (req, res) => {
    try {
        const { package_id } = req.params;
        const { description, weight, width, height, depth, from_name, from_address, from_location, to_name, to_address, to_location, active_delivery_id } = req.body;
        const package = await Package.findOne({ package_id });

        package.description = description;
        package.weight = weight;
        package.width = width;
        package.height = height;
        package.depth = depth;
        package.from_name = from_name;
        package.from_address = from_address;
        package.from_location = from_location;
        package.to_name = to_name;
        package.to_address = to_address;
        package.to_location = to_location;
        package.active_delivery_id = active_delivery_id;
        const result = await package.save();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const deletePackage = async (req, res) => {
    try {
        const { package_id } = req.params;
        const result = await Package.deleteOne({ package_id });
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { createPackage, getPackages, getPackage, updatePackage, deletePackage };