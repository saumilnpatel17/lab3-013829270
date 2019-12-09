const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buyerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: Number,
    street: String,
    unit_no: String,
    city: String,
    state: String,
    zip_code: String
});

module.exports = mongoose.model('Buyers', buyerSchema);