export class MatchingStatusDto {
  status: 'pending' | 'completed' | 'failed';
  startTime: Date | null;
  endTime: Date | null;
  errorMessage: string | null;

  constructor(partial: Partial<MatchingStatusDto>) {
    Object.assign(this, partial);
  }
}
