import * as mongoose from 'mongoose';

export const ServiceOrderSchema = new mongoose.Schema({
    serviceOrderNumber: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['awaiting payment', 'awaiting delivery', 'completed'],
        default: 'awaiting payment',
    },
    orders: [{
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
    }],
}, {timestamps: true});
