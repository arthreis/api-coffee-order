import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeeModule } from './product/coffee.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ServiceOrdersModule } from './service-orders/service-orders.module';

const DATABASE_URL = process.env.DATABASE_URL;
const LOCAL = 'mongodb://0.0.0.0/coffee-order';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_URL || LOCAL, {useNewUrlParser: true, useCreateIndex: true}),
    CoffeeModule,
    UsersModule,
    OrdersModule,
    ServiceOrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
