import { Document } from 'mongoose';
import { ObjectId } from 'bson';

export interface Coffee extends Document {
    readonly id?: ObjectId;
    readonly name: string;
    readonly description: string;
    readonly imagePath: string;
    readonly price: number;
}
