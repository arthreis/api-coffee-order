import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrder } from './interfaces/order.interface';
import { ObjectId } from 'bson';
import { CreateOrderDto } from "./dto/create-order.dto";
import { generateOrderNumber } from 'src/utils/utility';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel("Order") private readonly orderSchema: Model<IOrder>
    ){}

    async find(orderId: ObjectId): Promise<IOrder> {
        try {
            return await this.orderSchema.findOne({_id: orderId})
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAll(): Promise<IOrder[]> {
        try {
            return await this.orderSchema.find();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async create(createOrderDto: CreateOrderDto): Promise<IOrder> {
        try {
            const order = new this.orderSchema(createOrderDto);
            order.orderNumber = generateOrderNumber();
            order.items.map(item => item.subtotal = (parseFloat('2.25') * parseInt(item.quantity.toString())));
            order.totalValue = order.items.map(item => item.subtotal).reduce( (total, amount) => parseFloat(total.toFixed(2)) + parseFloat(amount.toFixed(2)));

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
