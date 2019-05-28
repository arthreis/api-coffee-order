import { Document } from 'mongoose';

export interface Coffee extends Document {
    readonly name: string;
    readonly description: string;
    readonly imagePath: string;
    // tslint:disable-next-line:ban-types
    readonly price: Number;
}
