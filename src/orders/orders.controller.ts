import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IOrder } from './interfaces/order.interface';

@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService){}

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

    @Delete()
    async delete(@Param() param){
        return await this.ordersService.delete(param);
    }
}
