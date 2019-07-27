import * as mongoose from 'mongoose';

export interface Coffee extends mongoose.Document {
    readonly id?: mongoose.Schema.Types.ObjectId;
    readonly name: string;
    readonly description: string;
    readonly imagePath: string;
    readonly price: number;
}
