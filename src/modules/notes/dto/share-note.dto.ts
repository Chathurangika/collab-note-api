import { IsNotEmpty, IsString } from 'class-validator';

export class ShareNoteDto {

    @IsNotEmpty()
    @IsString()
    userId: string[];

    @IsNotEmpty()
    @IsString()
    noteId: string;

}
