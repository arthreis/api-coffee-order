import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
    },
    orderNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum:['created', 'done'],
        default: 'created',
        required: true,
    },
    products: [{
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CoffeeSchema',
            required: true,
        }
    }],
    totalValue: {
        type: Number,
        required: true,
    },
}, {timestamps: true});
