import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindUsersQueryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    search?: string;
}
