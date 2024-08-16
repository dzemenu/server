const Package = require('../model/package.model');
const Delivery = require('../model/delivery.model');
const WebSocket = require('ws');

const createPackage = async (req, res) => {
    try {
        const { description, weight, width, height, depth, from_name, from_address, from_location, to_name, to_address, to_location } = req.body;
        const newPackage = new Package({
            description, weight, width, height, depth, from_name, from_address, from_location, to_name, to_address, to_location
        });
        const result = await newPackage.save();
        if (result) {
            return res.send(result);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

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
        const package = await Package.findOne({ package_id }).populate('active_delivery_id');

        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }

        // If the package has an active delivery, fetch the delivery details
        let delivery = null;
        if (package.active_delivery_id) {
            delivery = await Delivery.findOne({ delivery_id: package.active_delivery_id });
        }

        res.status(200).json({ package, delivery });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updatePackage = async (req, res) => {
    try {
        const { package_id } = req.params;
        const { description, weight, width, height, depth, from_name, from_address, from_location, to_name, to_address, to_location, active_delivery_id } = req.body;
        const package = await Package.findOne({ package_id });

        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }

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
};

const deletePackage = async (req, res) => {
    try {
        const { package_id } = req.params;
        const result = await Package.deleteOne({ package_id });
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// WebSocket setup for real-time delivery updates
 const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        const package_id = req.url.split('/').pop();  // Assuming the package_id is in the URL

        ws.on('message', async (message) => {
            console.log(`Received message: ${message} from package ID: ${package_id}`);
            const package = await Package.findOne({ package_id }).populate('active_delivery_id');

            if (package && package.active_delivery_id) {
                const delivery = await Delivery.findOne({ delivery_id: package.active_delivery_id });
                ws.send(JSON.stringify({ package, delivery }));
            } else {
                ws.send(JSON.stringify({ message: 'No active delivery found' }));
            }
        });

        ws.on('close', () => {
            console.log(`Connection closed for package ID: ${package_id}`);
        });
    });

    console.log('WebSocket server started');
};

module.exports = { createPackage, getPackages, getPackage, updatePackage, deletePackage, setupWebSocket };
