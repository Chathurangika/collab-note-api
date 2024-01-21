import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class LoggedUserPipe implements PipeTransform {

  constructor(private userService: UserService) {}
  
  async transform(value: any, metadata: ArgumentMetadata) {
    const user = await this.userService.findOne(value.sub);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }
}
