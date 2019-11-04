import { Controller, Get, Param, Body, Post, Put, Delete, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { IUser } from './interface/user.interface';
import { ObjectId } from 'bson';

@ApiUseTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    async findById(@Param('id') id: string) {
        return await this.usersService.findById(id);
    }

    @Get()
    async find(@Query('email') email: string) {
        const conditions = !!email ? { email } : {};
        return await this.usersService.find(conditions);
    }

    @Post()
    async create(@Body() user: IUser) {
        return await this.usersService.create(user);
    }

    @Put()
    async update(@Body() user: IUser) {
        return await this.usersService.update(user);
    }

    @Delete(':id')
    async delete(@Param('id', new ValidateObjectId()) userId: ObjectId) {
        return await this.usersService.delete(userId);
    }
}
