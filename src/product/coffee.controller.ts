import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Body, Post, Query, Put, Delete } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { Coffee } from './interfaces/coffee.interface';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Coffee')
@Controller('product')
export class CoffeeController {

    constructor(private coffeeService: CoffeeService) {}

    @Get('coffees')
    async getCoffees(@Res() res) {
        const coffees = await this.coffeeService.getCoffees();
        return res.status(HttpStatus.OK).json(coffees);
    }

    @Get('coffee/:coffeeId')
    async getCoffee(@Res() res, @Param('coffeeId', new ValidateObjectId()) coffeeId) {
        const coffee = await this.coffeeService.getCoffee(coffeeId);
        if (!coffee) {
            throw new NotFoundException('Coffee does not exist!');
        }
        return res.status(HttpStatus.OK).json(coffee);
    }

    @Post('/coffee')
    async addCoffee(@Res() res, @Body() coffee: Coffee) {
        const newCoffee = await this.coffeeService.addCoffee(coffee);
        return res.status(HttpStatus.OK).json({
            message: 'Coffee was successfully added !',
            coffee: newCoffee,
        });
    }

    @Put('/coffee')
    async editCoffee(@Res() res, @Query('coffeeId', new ValidateObjectId()) coffeeId, @Body() coffee: Coffee) {
        const editedCoffee = await this.coffeeService.editCoffee(coffeeId, coffee);
        if (!editedCoffee) {
            throw new NotFoundException('Coffee does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Coffee has been successfully updated',
            coffee: editedCoffee,
        });
    }

    @Delete('/coffee')
    async deleteCoffee(@Res() res, @Query('coffeeId', new ValidateObjectId()) coffeId) {
        const deletedCoffee = await this.coffeeService.deleteCoffee(coffeId);
        return res.status(HttpStatus.OK).json({
            message: 'Coffee has been deleted !',
            coffee: deletedCoffee,
        });
    }

}
