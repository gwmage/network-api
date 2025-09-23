import { Test, TestingModule } from '@nestjs/testing';
import { MatchingController } from '../src/modules/matching/matching.controller';
import { MatchingService } from '../src/modules/matching/matching.service';
import { MatchingStatusDto } from '../src/modules/matching/dto/matching-status.dto';

describe('MatchingController', () => {
  let controller: MatchingController;
  let service: MatchingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchingController],
      providers: [
        {
          provide: MatchingService,
          useValue: {
            getStatus: jest.fn().mockResolvedValue({ status: 'pending', startTime: null, endTime: null, errorMessage: null }),
          },
        },
      ],
    }).compile();

    controller = module.get<MatchingController>(MatchingController);
    service = module.get<MatchingService>(MatchingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /matching/status', () => {
    it('should return the matching status', async () => {
      const mockStatus: MatchingStatusDto = { status: 'pending', startTime: null, endTime: null, errorMessage: null };
      const status = await controller.getStatus();
      expect(status).toEqual(mockStatus);
    });
  });
});
