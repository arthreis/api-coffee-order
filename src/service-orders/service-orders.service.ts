import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceOrdersService {
    constructor(
        @InjectModel("ServiceOrder") private readonly orderSchema: Model<IOrder>
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
