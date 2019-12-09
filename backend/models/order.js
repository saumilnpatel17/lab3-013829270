const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    buyerName: {
        type: String,
        required: true
    },
    buyerAddress: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    restId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    restName: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    items: [
        {   
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    messages: [
        {   
            senderName: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            sentDate: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Orders', orderSchema);