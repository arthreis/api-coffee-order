import { Controller, Get, Post, Put, Delete }import { ApiUseTags } from '@nestjs/swagger';
 from '@nestjs/common';

@ApiUseTags('Service-Order')
@Controller('service-orders')
export class ServiceOrdersController {

    @Get()
    async findAdll(){

    }
    @Get(':id')
    async find(){

    }
    @Post()
    async create(){

    }
    @Put()
    async update(){

    }
    @Delete(':id')
    async delete(){

    }
}
