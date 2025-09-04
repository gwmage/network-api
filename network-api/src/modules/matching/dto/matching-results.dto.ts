import { MatchingGroupDto } from './matching-group.dto';

export class MatchingResultsDto {
  groups: MatchingGroupDto[];
  notificationId: string;
  // Add other relevant fields like scores, explanations, etc.
}