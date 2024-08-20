import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class MiddlewareLoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}

export function loggerGlobal(req: Request, res: Response, next: NextFunction){
  const date = new Date();
  console.log(`${date} -- Llamando al endpoint ${req.method} en la ruta ${req.url}`);
  next();
}