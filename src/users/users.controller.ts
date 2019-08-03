import { Controller, Get, Param, Body, Post, Put, Delete, Headers } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { IUser } from './interface/user.interface';
import { ObjectId } from 'bson';

@ApiUseTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    async find(@Headers('user-id') userId: ObjectId, @Headers('user-email') userEmail: string) {
        if (userId || userEmail) {
            const condition = !!userId ? { _id: userId } : { email: userEmail };
            return await this.usersService.findByIdOrEmail(condition);
        } else {
            return await this.usersService.findAll();
        }
    }

    @Post()
    async create(@Body() user: IUser) {
        return await this.usersService.create(user);
    }

    @Put()
    async update(@Body() user: IUser) {
        return await this.usersService.update(user);
    }

    @Delete(':userId')
    async delete(@Param('userId', new ValidateObjectId()) userId: ObjectId) {
        return await this.usersService.delete(userId);
    }
}
