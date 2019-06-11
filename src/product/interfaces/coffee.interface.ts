import { Document } from 'mongoose';

export interface Coffee extends Document {
    readonly name: string;
    readonly description: string;
    readonly imagePath: string;
    readonly price: Number;
}
