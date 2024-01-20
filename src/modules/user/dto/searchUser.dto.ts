import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SortDirection } from 'src/common/enum';

export class SearchUserDto {
    @IsNotEmpty()
    @IsString()
    keyword?: string;

    @IsNotEmpty()
    @IsString()
    sortKey: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(SortDirection)
    sortDirection: SortDirection;

}
