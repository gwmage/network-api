export class MatchingStatusDto {
  status: 'pending' | 'completed' | 'failed' = 'pending';
  startTime: Date | null = null;
  endTime: Date | null = null;
  errorMessage: string | null = null;

  constructor(partial: Partial<MatchingStatusDto>) {
    Object.assign(this, partial);
  }
}