import { ObjectId } from "bson";
import { Document } from "mongoose";

export interface IUser extends Document {
    id?: ObjectId
    name: string
    lastName: string
    email: string
}
