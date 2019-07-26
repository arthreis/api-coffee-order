import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { CoffeeSchema } from './../product/schemas/coffee.schemas';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Order', schema: OrderSchema}, {name: 'Coffee', schema: CoffeeSchema}])
    ],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {}
