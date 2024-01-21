import { Get, Put, Body, Post, Controller } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { EditProfileDto } from './dto/editProfile.dto';
import { ChanageUserPasswordDto } from '../user/dto/chanageUserPassword.dto';
import { Types } from 'mongoose';
import { UserDocument } from '../user/schemas/user.schema';
import { AuthenticatedUser } from 'src/common/authenticated-user.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findOne(id: Types.ObjectId) {
    const user = await this.userService.findOne(id);
    return user;
  }

  @Put('edit')
  async editProfile(
    @AuthenticatedUser() user: UserDocument,
    @Body() editProfileDto: EditProfileDto,
  ) {
    return await this.userService.updateUser(user, editProfileDto);
  }

  @Post('change-password')
  async changePassword(
    user: UserDocument,
    @Body() chanageUserPasswordDto: ChanageUserPasswordDto,
  ) {   
    await this.userService.changePassword(user, chanageUserPasswordDto);

    return { message: 'password changed' };
  }
}
