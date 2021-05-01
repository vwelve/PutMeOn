import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import IPayload from '../interfaces/payload.interface';

export const Payload = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return <IPayload>request.user;
  },
);