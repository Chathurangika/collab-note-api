import { IsNotEmpty } from 'class-validator';

export class EditProfileDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
