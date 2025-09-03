import { Injectable } from '@nestjs/common';

@Injectable()
export class MatchingService {
  private matchingStatus: string = 'idle';

  async triggerMatching() {
    this.matchingStatus = 'running';
    // Implement matching logic here.  Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 5000));

    this.matchingStatus = 'completed';
    return { status: 'success', message: 'Matching process triggered' };
  }

  async getMatchingStatus() {
    return { status: this.matchingStatus };
  }
}
