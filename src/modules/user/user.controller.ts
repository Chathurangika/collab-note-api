import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { SearchUserDto } from './dto/searchUser.dto';
import { AuthenticatedUser } from 'src/common/authenticated-user.decorator';
import { UserDocument } from './schemas/user.schema';
import { ObjectIdParam } from 'src/common/params';


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

  @Get(':id')
  async findOne(
    @Param() param: ObjectIdParam,
  ) {
    const user = await this.userService.findOne(param.id);
    return user;
  }

}
