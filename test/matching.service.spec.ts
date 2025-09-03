import { Test, TestingModule } from '@nestjs/testing';
import { MatchingService } from '../src/modules/matching/matching.service';

describe('MatchingService', () => {
  let service: MatchingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchingService],
    }).compile();

    service = module.get<MatchingService>(MatchingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should trigger the matching process', async () => {
    expect(await service.triggerMatching()).toEqual({ status: 'success', message: 'Matching process triggered' });
  });

  it('should return the matching status', async () => {
    await service.triggerMatching(); // Trigger the matching to change the status
    expect(await service.getMatchingStatus()).toEqual({ status: 'completed' });
  });


});
