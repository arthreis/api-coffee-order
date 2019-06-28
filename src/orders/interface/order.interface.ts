import { ObjectId } from "bson";
import * as mongoose from "mongoose";

export interface IOrder extends mongoose.Document{
    id?: ObjectId
    name: string
}
