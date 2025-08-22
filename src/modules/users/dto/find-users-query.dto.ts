import { ApiProperty } from '@nestjs/swagger';

export class FindUsersQueryDto {
  @ApiProperty()
  searchTerm?: string;
}