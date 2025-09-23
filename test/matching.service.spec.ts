import { Test, TestingModule } from '@nestjs/testing';
import { MatchingService } from '../src/modules/matching/matching.service';
import { MatchingStatusDto } from '../src/modules/matching/dto/matching-status.dto';

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

  it('should return the initial matching status', async () => {
    const status = await service.getStatus();
    expect(status).toEqual({ status: 'pending', startTime: new Date(), endTime: null, errorMessage: null });
  });

  it('should update and retrieve the matching status', async () => {
    const startTime = new Date();
    service.updateStatus('completed', startTime, new Date());
    const status = await service.getStatus();
    expect(status.status).toBe('completed');
    expect(status.startTime).toEqual(startTime);
  });
});
