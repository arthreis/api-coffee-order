import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Body, Post, Query, Put, Delete } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { Coffee } from './interfaces/coffee.interface';
import { ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ObjectId } from 'bson';

@ApiUseTags('Coffee')
@Controller('product')
export class CoffeeController {

    constructor(private coffeeService: CoffeeService) {}

    @Get('coffees')
    async getCoffees(@Res() res: Response) {
        const coffees = await this.coffeeService.getCoffees();
        return res.status(HttpStatus.OK).json(coffees);
    }

    @Get('coffees/:coffeeId')
    async getCoffee(@Res() res: Response, @Param('coffeeId', new ValidateObjectId()) coffeeId: ObjectId) {
        const coffee = await this.coffeeService.getCoffee(coffeeId);
        if (!coffee) {
            throw new NotFoundException('Coffee does not exist!');
        }
        return res.status(HttpStatus.OK).json(coffee);
    }

    @Post('/coffees')
    async addCoffee(@Res() res: Response, @Body() coffee: Coffee) {
        const newCoffee = await this.coffeeService.addCoffee(coffee);
        return res.status(HttpStatus.OK).json({
            message: 'Coffee was successfully added !',
            coffee: newCoffee,
        });
    }

    @Put('/coffees')
    async editCoffee(@Res() res: Response, @Query('coffeeId', new ValidateObjectId()) coffeeId: ObjectId, @Body() coffee: Coffee) {
        const editedCoffee = await this.coffeeService.editCoffee(coffeeId, coffee);
        if (!editedCoffee) {
            throw new NotFoundException('Coffee does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Coffee has been successfully updated',
            coffee: editedCoffee,
        });
    }

    @Delete('/coffees')
    async deleteCoffee(@Res() res: Response, @Query('coffeeId', new ValidateObjectId()) coffeId: ObjectId) {
        const deletedCoffee = await this.coffeeService.deleteCoffee(coffeId);
        return res.status(HttpStatus.OK).json({
            message: 'Coffee has been deleted !',
            coffee: deletedCoffee,
        });
    }

}
