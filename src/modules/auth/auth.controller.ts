import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/loginUserDto.dto';
import { RegiserUserDto } from './dto/registerUser.dto';
import { Public } from './utils/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() loginDto: LoginUserDto) {

    const auth = await this.authService.login(loginDto);
    return auth;
  }

  @Post('register')
  @Public()
  async register(@Body() registerDto: RegiserUserDto) {
    const user = await this.authService.register(registerDto);
    return user;
  }
}
