const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    sections: [
        {
            id: mongoose.Schema.Types.ObjectId,
            name: {
                type: String,
                required: true
            },
            menus : [
                {
                    id: mongoose.Schema.Types.ObjectId,
                    name: {
                        type: String,
                        required: true,
                    },
                    description: String,
                    price: {
                        type: Number,
                        required: true
                    },
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Restaurants', restaurantSchema);