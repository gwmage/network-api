import { ApiProperty } from '@nestjs/swagger';
import { ApplicationInfoDto } from './application-info.dto';

export class PaginatedApplicationsDto {
  @ApiProperty({ type: [ApplicationInfoDto] })
  data: ApplicationInfoDto[];

  @ApiProperty()
  total: number;
}
