import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceOrderSchema } from './schema/service-order.schema';
import { ServiceOrdersController } from './service-orders.controller';
import { ServiceOrdersService } from './service-orders.service';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: 'ServiceOrder', schema: ServiceOrderSchema }])
    ],
    controllers: [ServiceOrdersController],
    providers: [ServiceOrdersService]
})
export class ServiceOrdersModule {}
