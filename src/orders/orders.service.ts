import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrder } from './interfaces/order.interface';
import { ObjectId } from 'bson';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel("Order") private readonly orderSchema: Model<IOrder>
    ){}

    async findAll(): Promise<IOrder[]> {
        try {
            return await this.orderSchema.find();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async create(order: IOrder): Promise<IOrder> {
        try {
            return await this.orderSchema.create(order);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(order: IOrder): Promise<IOrder> {
        try {
            return await this.orderSchema.findOneAndUpdate({_id: order._id}, order, {new: true});
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async delete(orderId: ObjectId): Promise<IOrder> {
        try {
            return await this.orderSchema.findOneAndDelete({_id: orderId});
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
