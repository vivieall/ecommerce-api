import { MiddlewareLoggerMiddleware } from './middleware-logger.middleware';

describe('MiddlewareLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new MiddlewareLoggerMiddleware()).toBeDefined();
  });
});
