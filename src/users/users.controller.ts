import { Controller, Get, Param, Res, HttpStatus, Body, Post, Put, Delete } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id.pipes';
import { IUser } from './interface/user.interface';

@ApiUseTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get(':userId')
    async find(@Param('userId', new ValidateObjectId()) userId){
        return await this.usersService.find(userId);
    }

    @Get()
    async findAll(@Res() res){
        const users = await this.usersService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Post()
    async create(@Body() user: IUser){
        return await this.usersService.create(user);
    }

    @Put()
    async update(@Body() user: IUser){
        return await this.usersService.update(user);
    }

    @Delete(':userId')
    async delete(@Param('userId', new ValidateObjectId()) userId){
        return await this.usersService.delete(userId);
    }
}
