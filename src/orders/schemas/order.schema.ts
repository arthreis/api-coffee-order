import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['awaiting', 'associated'],
        default: 'awaiting',
    },
    items: [{
        quantity: {
            type: Number,
            required: true,
        },
        subtotal: {
            type: Number,
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CoffeeSchema',
            required: true,
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema',
        required: true,
    },
    totalValue: {
        type: Number,
        required: true,
    },
}, {timestamps: true});
