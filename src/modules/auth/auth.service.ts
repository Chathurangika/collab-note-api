import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/loginUserDto.dto';
import { RegiserUserDto } from './dto/registerUser.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async register(registerDto: RegiserUserDto) {
    const isUserExists = await this.userService.findOneByEmail(registerDto.email);

    if (!!isUserExists) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.userService.createUser({
      ...registerDto
    });

    return user;
  }

  async login(loginDto: LoginUserDto): Promise<{
    userId: Types.ObjectId,
    fullName: string,
    email: string,
    token: string
  }> {
    const user = await this.userService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user?.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid user credentials');
    }

    const payload = { sub: user._id, user  };
    const data = await this.jwtService.signAsync(payload);
    const loginResponse = {
      userId: user._id,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      token: data
    };
    return loginResponse;
  }

}
