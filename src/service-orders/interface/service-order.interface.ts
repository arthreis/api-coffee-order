import { Document } from "mongoose";
import { ObjectId } from "bson";

export interface IServiceOrder extends Document{
    id?: ObjectId
    user: string
    serviceOrderNumber: string
    status: string
    orders: [ObjectId]
}
