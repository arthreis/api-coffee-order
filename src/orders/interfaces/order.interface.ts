import { ObjectId } from "bson";
import * as mongoose from "mongoose";

export interface IOrder extends mongoose.Document{

    id?: ObjectId

    orderNumber: string

    status: string

    items: [{quantity: Number, subtotal: Number, product: mongoose.Schema.Types.ObjectId}]

    user: mongoose.Schema.Types.ObjectId

    totalValue: Number

}
