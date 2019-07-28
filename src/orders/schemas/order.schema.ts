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
    items: [
        new mongoose.Schema({
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            subtotal: {
                type: Number,
                required: true,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Coffee',
                required: true,
            },
        }, {_id: false}),
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    totalValue: {
        type: Number,
        required: true,
    },
}, {timestamps: true}).pre('save', (next) => {
    console.log('pre.save.order');
    next();
});
