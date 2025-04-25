import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { ContentTypeGuard } from "./content-type.guard";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
    {
      bodyParser: true,
    }
  );
  app.useGlobalGuards(new ContentTypeGuard());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
