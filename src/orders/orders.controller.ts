import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IOrder } from './interfaces/order.interface';
import { ApiUseTags } from '@nestjs/swagger';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { CreateOrderDto } from './dto/create-order.dto';
import { ObjectId } from 'bson';

@ApiUseTags('Order')
@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService) {}

    @Get(':orderId')
    async findById(@Param('orderId', new ValidateObjectId()) orderId: ObjectId) {
        return await this.ordersService.find(orderId);
    }
    @Get()
    async find(@Query('email') email: string) {
        const conditions = !!email ? { email } : {};
        return await this.ordersService.find(conditions);
    }

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        return await this.ordersService.create(createOrderDto);
    }

    @Put()
    async update(@Body() order: IOrder) {
        return await this.ordersService.update(order);
    }

    @Delete(':orderId')
    async delete(@Param('orderId', new ValidateObjectId()) orderId: ObjectId) {
        return await this.ordersService.delete(orderId);
    }
}
