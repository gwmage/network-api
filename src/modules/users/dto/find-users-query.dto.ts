import { ApiProperty } from '@nestjs/swagger';

export class FindUsersQueryDto {
  @ApiProperty()
  keyword?: string;
}