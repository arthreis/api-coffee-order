import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IOrder } from './interfaces/order.interface';
import { ApiUseTags } from '@nestjs/swagger';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id.pipes';

@ApiUseTags('Order')
@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService){}

    @Get(':orderId')
    async find(@Param('orderId', new ValidateObjectId()) orderId){
        return await this.ordersService.find(orderId);
    }
    @Get()
    async findAll(){
        return await this.ordersService.findAll();
    }

    @Post()
    async create(@Body() order: IOrder) {
        return await this.ordersService.create(order);
    }

    @Put()
    async update(@Body() order: IOrder) {
        return await this.ordersService.update(order);
    }

    @Delete(':orderId')
    async delete(@Param('orderId', new ValidateObjectId()) orderId){
        return await this.ordersService.delete(orderId);
    }
}
