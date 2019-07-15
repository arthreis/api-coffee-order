import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeeModule } from './product/coffee.module';
import { UsersModule } from './users/users.module';

const DEV = "mongodb://coffee-order-user:c0ff33-0rd3r@ds261296.mlab.com:61296/coffee-order";
const LOCAL  = "mongodb://0.0.0.0/coffee-order";

@Module({
  imports: [
    MongooseModule.forRoot(DEV, {useNewUrlParser: true}),
    CoffeeModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
