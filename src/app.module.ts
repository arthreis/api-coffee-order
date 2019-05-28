import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeeModule } from './product/coffee.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://coffee-order-user:c0ff33-0rd3r@ds261296.mlab.com:61296/coffee-order', {useNewUrlParser: true}),
    CoffeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
