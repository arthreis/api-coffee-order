import * as mongoose from "mongoose";

export const ServiceOrderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
    },
    serviceOrderNumber: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['awaiting', 'associated','completed','closed']
    },
    orders: [{
        order: {
            type: mongoose.Schema.Types.ObjectId
        }
    }]
});
