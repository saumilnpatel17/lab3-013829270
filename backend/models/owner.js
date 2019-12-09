const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    restaurantZip: String
});

module.exports = mongoose.model('Owners', ownerSchema);