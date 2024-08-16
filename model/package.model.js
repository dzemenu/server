const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    }
});

const packageSchema = new mongoose.Schema({
    package_id: {
        type: String,
        required: true,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    active_delivery_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Delivery',
        required: true,
        default: () => new mongoose.Types.ObjectId().toString()

    },
    description: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    depth: {
        type: Number,
        required: true
    },
    from_name: {
        type: String,
        required: true
    },
    from_address: {
        type: String,
        required: true
    },
    from_location: {
        type: locationSchema,
        required: true
    },
    to_name: {
        type: String,
        required: true
    },
    to_address: {
        type: String,
        required: true
    },
    to_location: {
        type: locationSchema,
        required: true
    }
}); // Disable default _id field

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
