import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import conf from './conf/configuration';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const port = normalizePort(process.env.PORT || 3000);

  const options = new DocumentBuilder()
    .setTitle('DOC-API-COFFEE')
    .setVersion(conf.getVersion)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  console.log("API running on port :"+ port);

  await app.listen(port);
}

function normalizePort(val){
  const port = parseInt(val,  10);

  if(isNaN(port)){
      return val;
  }

  if(port >= 0){
      return port;
  }

  return false;
}
bootstrap();
