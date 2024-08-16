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

const deliverySchema = new mongoose.Schema({
    delivery_id: {
        type: String,
        required: true,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    pickup_time: {
        type: Date,

    },
    start_time: {
        type: Date,

    },
    end_time: {
        type: Date,

    },
    location: {
        type: locationSchema,

    },
    status: {
        type: String,
        enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed'],
        required: true,
        default: 'open'
    }
})
const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery