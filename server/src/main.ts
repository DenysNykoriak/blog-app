import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ["http://localhost:3000"],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: false }));

  await app.listen(process.env.PORT);
}
bootstrap();
