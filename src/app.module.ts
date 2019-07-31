import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeeModule } from './product/coffee.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ServiceOrdersModule } from './service-orders/service-orders.module';

const DEV = process.env.DATABASE_URL;
const LOCAL = 'mongodb://mongo/coffee-order';

@Module({
  imports: [
    MongooseModule.forRoot(DEV || LOCAL, {useNewUrlParser: true, useCreateIndex: true}),
    CoffeeModule,
    UsersModule,
    OrdersModule,
    ServiceOrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
