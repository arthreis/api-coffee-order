import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coffee } from 'src/product/interfaces/coffee.interface';

@Injectable()
export class CoffeeService {

    constructor(@InjectModel ('Coffee') private readonly coffeeModel: Model<Coffee> ) {}

    async getCoffees(): Promise<Coffee[]> {
        const coffees = await this.coffeeModel.find().exec();
        return coffees;
    }

    async getCoffee(coffeeId): Promise<Coffee> {
        const coffee = await this.coffeeModel.findById(coffeeId).exec();
        return coffee;
    }

    async addCoffee(newCoffee: Coffee): Promise<Coffee> {
        const coffee = await this.coffeeModel.create(newCoffee);
        return coffee.save();
    }

    async editCoffee(coffeeId, coffee: Coffee): Promise<Coffee> {
        const editedCoffee = await this.coffeeModel.findByIdAndUpdate(coffeeId, coffee, { new: true });
        return editedCoffee;
    }

    async deleteCoffee(coffeeId): Promise<any> {
        const deletedCoffee = await this.coffeeModel.findByIdAndRemove(coffeeId);
        return deletedCoffee;
    }
}
