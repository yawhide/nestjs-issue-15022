import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter, HttpAdapterHost } from "@nestjs/core";
import { FastifyReply, errorCodes } from "fastify";

/**
 * Adapted Fastify version of the errorMiddleware.
 * Typed errors could be caught instead using the `@Catch` decorator.
 * @see src/endpoints/src/common/framework/middlewares/error.ts
 */
@Catch(Error)
export class ErrorExceptionFilter extends BaseExceptionFilter {
  constructor(private readonly _httpAdapterHost: HttpAdapterHost) {
    super(_httpAdapterHost.httpAdapter);
  }

  catch(error: Error, host: ArgumentsHost) {
    console.error(error);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as FastifyReply;
    return response.status(500);
  }
}
