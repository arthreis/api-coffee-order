import * as mongoose from 'mongoose';

export interface IServiceOrder extends mongoose.Document {
    id?: mongoose.Schema.Types.ObjectId
    user: mongoose.Schema.Types.ObjectId
    serviceOrderNumber: string
    status: string
    orders: [mongoose.Schema.Types.ObjectId]
}
