import { Controller, Get, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { SearchUserDto } from './dto/searchUser.dto';
import { AuthenticatedUser } from 'src/common/authenticated-user.decorator';
import { UserDocument } from './schemas/user.schema';


@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  async findAll(
    @AuthenticatedUser() user: UserDocument,
    @Query() query: SearchUserDto,
  ) {

    const users = this.userService.findAllOnSearch(user._id, query);
    return users;
  }

}
