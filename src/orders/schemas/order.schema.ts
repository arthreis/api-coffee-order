import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
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
}, {timestamps: true});
