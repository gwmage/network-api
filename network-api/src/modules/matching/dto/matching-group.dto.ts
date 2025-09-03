"import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class MatchingGroupDto {
  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  userIds: number[];

  // Add other relevant group info as needed
}"