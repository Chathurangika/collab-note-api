import { IsNotEmpty } from 'class-validator';

export class UserEnabledDto {
  @IsNotEmpty()
  enabled: boolean;
}
