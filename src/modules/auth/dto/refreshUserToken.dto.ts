import { IsNotEmpty } from 'class-validator';

export class RefreshUserTokenDto {
  @IsNotEmpty()
  refreshToken: string;
}
