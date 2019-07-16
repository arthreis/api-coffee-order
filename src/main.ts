import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { apiTitle, version } from "./conf/configuration";

declare const module: any;

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    app.enableCors();

    const port = normalizePort(process.env.PORT || 3000);

    const options = new DocumentBuilder()
        .setTitle(apiTitle())
        .setVersion(version())
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    console.log("API running on port :"+ port);

    await app.listen(port);

    if(module.hot){
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
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
