import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrder } from './interfaces/order.interface';
import { Coffee } from './../product/interfaces/coffee.interface';
import { IUser } from './../users/interface/user.interface';
import { ObjectId } from 'bson';
import { CreateOrderDto } from './dto/create-order.dto';
import { generateOrderNumber } from './../utils/utility';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel('Order') private readonly orderSchema: Model<IOrder>,
        @InjectModel('Coffee') private readonly coffeeSchema: Model<Coffee>,
        @InjectModel('User') private readonly userSchema: Model<IUser>,
    ) {}

    async findById(orderId: ObjectId): Promise<IOrder> {
        try {
            return await this.orderSchema.findOne({_id: orderId}).exec();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async find(conditions: object): Promise<IOrder[]> {
        try {
            if (Object.keys(conditions).length) {
                const user = await this.userSchema.findOne(conditions).exec();
                if (user) {
                    conditions = { user: user._id };
                } else {
                    throw new NotFoundException('User not found');
                }
            }
            return await this.orderSchema.find(conditions)
                .populate('user', 'name email')
                .populate('items.product', 'name')
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async create(createOrderDto: CreateOrderDto): Promise<IOrder> {
        try {
            const productsIds = createOrderDto.items.map(item => item.product);

            const coffeesModel = await this.coffeeSchema.find({_id: {$in: productsIds} }).exec();

            if (productsIds.length !== coffeesModel.length) {
                throw new InternalServerErrorException('Product not found!');
            }

            createOrderDto.items.forEach(item => {
                const product = coffeesModel.find( c => c.id === item.product );
                item.subtotal = Number((item.quantity * product.price).toFixed(2));
            });

            const order = new this.orderSchema(createOrderDto);
            const totalValue = order.items.map(item => item.subtotal).reduce( (total, amount) => total + amount );
            order.totalValue = Number(totalValue.toFixed(2));
            order.orderNumber = generateOrderNumber();
            return await this.orderSchema.create(order);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(order: IOrder): Promise<IOrder> {
        try {
            return await this.orderSchema.findOneAndUpdate({_id: order._id}, order, {new: true}).exec();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async delete(orderId: ObjectId): Promise<IOrder> {
        try {
            return await this.orderSchema.findOneAndDelete({_id: orderId}).exec();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
