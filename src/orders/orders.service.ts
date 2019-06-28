import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrder } from './interface/order.interface';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel("Order") private readonly ordersSchema: Model<IOrder>
    ){}

    async findAll() {
        try {
            return await this.ordersSchema.find();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
