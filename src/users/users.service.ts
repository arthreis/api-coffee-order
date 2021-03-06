import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import { ObjectId } from 'bson';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userSchema: Model<IUser>) {}

    async findById(userId: string): Promise<IUser> {
        return this.userSchema.findOne({_id: userId});
    }
    async find(conditions: object): Promise<IUser[]> {
        return this.userSchema.find(conditions);
    }
    async create(user: IUser): Promise<IUser> {
        return this.userSchema.create(user);
    }
    async update(user: IUser): Promise<IUser> {
        return this.userSchema.findOneAndUpdate({_id: user._id}, user);
    }
    async delete(userId: ObjectId): Promise<IUser> {
        return this.userSchema.findOneAndDelete({_id: userId});
    }
}
