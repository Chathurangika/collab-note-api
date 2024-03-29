import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { LoggedUserPipe } from './pipes/logged-user.pipe';

const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log("UserDeco", request.user)
    return request.user;
  });
  
  
  export const AuthenticatedUser = () => User(undefined, LoggedUserPipe);
