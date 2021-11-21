import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core'
import { AppModule } from './plentina.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
Logger.log("Started server --> Listening at port 3000");
