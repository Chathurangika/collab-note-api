import { IsNotEmpty } from 'class-validator';

export class EditUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

}
