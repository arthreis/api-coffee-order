import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ServiceOrdersService } from './service-orders.service';
import { IServiceOrder } from './interface/service-order.interface';

@ApiUseTags('Service-Order')
@Controller('service-orders')
export class ServiceOrdersController {

    constructor(private readonly serviceOrders: ServiceOrdersService) {}

    @Get(':osNumber')
    async find(@Param('osNumber') osNumber) {
        return await this.serviceOrders.find(osNumber);
    }

    @Get()
    async findAdll() {
        return await this.serviceOrders.findAll();
    }

    @Post()
    async create(@Body() serviceOrder: IServiceOrder) {
        return await this.serviceOrders.create(serviceOrder);
    }

    @Put()
    async update(@Body() serviceOrder: IServiceOrder) {
        return await this.serviceOrders.update(serviceOrder);
    }

    @Delete(':osNumber')
    async delete(@Param('osNumber') osNumber) {
        return await this.serviceOrders.delete(osNumber);
    }
}
