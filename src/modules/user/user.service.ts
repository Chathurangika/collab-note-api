import { Types } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EditUserDto } from './dto/editUser.dto';
import { UserRepository } from './repositories/user.repository';
import { UserDocument } from './schemas/user.schema';
import { UserEnabledDto } from './dto/user-enabled.dto';
import { ChanageUserPasswordDto } from './dto/chanageUserPassword.dto';
import { SearchUserDto } from './dto/searchUser.dto';
import { RegiserUserDto } from '../auth/dto/registerUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  findAllOnSearch(userId: Types.ObjectId, query: SearchUserDto) {
    return this.userRepository.findAllOnSearch(userId, query);
  }

  async createUser(data: RegiserUserDto) {
    const saltOrRounds = await bcrypt.genSalt();
    const password = data.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return this.userRepository.createOne({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: data.firstName.charAt(0),
      enabled: true,
      password: hash,
    });
  }

  async findOne(id: Types.ObjectId) {
    const user = await this.userRepository.findOne(id);
    if (user == null) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }

  async updateUser(user: UserDocument, data: EditUserDto) {
    const updatedUser = await this.userRepository.updateOne(user._id, data);
    return updatedUser;
  }

  async changePassword(user: UserDocument, data: ChanageUserPasswordDto) {
    const saltOrRounds = await bcrypt.genSalt();
    const password = data.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    await this.userRepository.changePassword(user._id, hash);
  }

  async updateIsActive(user: UserDocument, data: UserEnabledDto) {
    const updatedUser = await this.userRepository.updateIsActive(
      user._id,
      data,
    );

    return updatedUser;
  }
}
