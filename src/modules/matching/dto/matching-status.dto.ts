export interface MatchingStatusDto {
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime: Date | null;
  endTime: Date | null;
  errorMessage: string | null;
}
