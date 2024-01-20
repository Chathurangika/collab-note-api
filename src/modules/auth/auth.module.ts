import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import jwtAuthConfig from 'src/config/jwtAuth.config';

@Module({
  imports: [UserModule,
    JwtModule.register({
      global: true,
      secret: jwtAuthConfig.secret,
      signOptions: { expiresIn: '1140m' },
    }),],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
