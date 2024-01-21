import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NotesDto {

    @IsOptional()
    @IsString()
    id?: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    content: string;

}
