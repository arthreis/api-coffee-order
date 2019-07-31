import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    id?: mongoose.Schema.Types.ObjectId
    name: string
    lastName: string
    email: string
}
