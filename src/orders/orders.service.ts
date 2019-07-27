import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrder } from './interfaces/order.interface';
import { Coffee } from './../product/interfaces/coffee.interface';
import { ObjectId } from 'bson';
import { CreateOrderDto } from './dto/create-order.dto';
import { generateOrderNumber } from './../utils/utility';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel('Order') private readonly orderSchema: Model<IOrder>,
        @InjectModel('Coffee') private readonly coffeeSchema: Model<Coffee>,
    ) {}

    async find(orderId: ObjectId): Promise<IOrder> {
        try {
            return await this.orderSchema.findOne({_id: orderId});
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
            const productsIds = createOrderDto.items.map(item => item.product);

            const coffeesModel = await this.coffeeSchema.find({_id: {$in: productsIds} }).exec();

            createOrderDto.items.map(item => {
                const product = coffeesModel.filter( c => {
                    return c.id === item.product;
                })[0];
                item.subtotal = product.price * item.quantity;
            });

            const order = new this.orderSchema(createOrderDto);
            order.totalValue = order.items.map(item => item.subtotal).reduce( (total, amount) => total + amount );
            order.orderNumber = generateOrderNumber();
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
