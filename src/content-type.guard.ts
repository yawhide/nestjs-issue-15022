import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnsupportedMediaTypeException,
} from "@nestjs/common";

@Injectable()
export class ContentTypeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Allow GET and OPTIONS requests without content-type
    if (request.method === "GET" || request.method === "OPTIONS") {
      return true;
    }

    // For POST requests, require and validate content-type
    if (request.method === "POST") {
      const contentType = request.headers["content-type"];

      if (!contentType) {
        throw new UnsupportedMediaTypeException({
          message: "Content-Type header is required",
        });
      }

      // Check if content type starts with application/json (case insensitive)
      // This also handles content types with charset, e.g. "application/json; charset=utf-8"
      if (!contentType.toLowerCase().startsWith("application/json")) {
        throw new UnsupportedMediaTypeException({
          message: "Content-Type must be application/json",
        });
      }
    }

    return true;
  }
}
