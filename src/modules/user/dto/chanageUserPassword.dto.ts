import { IsNotEmpty } from 'class-validator';

export class ChanageUserPasswordDto {
  @IsNotEmpty()
  password: string;
}
