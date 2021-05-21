import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import Payload from '../classes/payload';

export const GetPayload = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return <Payload>request.user;
  },
);