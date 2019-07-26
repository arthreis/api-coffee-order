import * as mongoose from 'mongoose';

export interface IOrder extends mongoose.Document{

    id?: mongoose.Schema.Types.ObjectId

    orderNumber: string

    status: string

    items: [{quantity: number, subtotal: number, product: mongoose.Schema.Types.ObjectId}]

    user: mongoose.Schema.Types.ObjectId

    totalValue: number

}
