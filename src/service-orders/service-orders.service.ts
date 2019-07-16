import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IServiceOrder } from './interface/service-order.interface';
import { ObjectId } from 'bson';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ServiceOrdersService {
    constructor(
        @InjectModel("ServiceOrder") private readonly serciceOrderSchema: Model<IServiceOrder>
    ){}

    async find(osNumber: String): Promise<IServiceOrder> {
        try {
            return await this.serciceOrderSchema.findOne({serviceOrderNumber: osNumber})
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAll(): Promise<IServiceOrder[]> {
        try {
            return await this.serciceOrderSchema.find();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async create(serviceOrder: IServiceOrder): Promise<IServiceOrder> {
        try {
            return await this.serciceOrderSchema.create(serviceOrder);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(serviceOrder: IServiceOrder): Promise<IServiceOrder> {
        try {
            return await this.serciceOrderSchema.findOneAndUpdate({serviceOrderNumber: serviceOrder.serviceOrderNumber}, serviceOrder, {new: true});
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async delete(serviceOrderNumber: ObjectId): Promise<IServiceOrder> {
        try {
            return await this.serciceOrderSchema.findOneAndDelete({serviceOrderNumber: serviceOrderNumber});
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
