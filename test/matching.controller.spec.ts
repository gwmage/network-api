```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MatchingController } from '../src/matching/matching.controller';
import { MatchingService } from '../src/matching/matching.service';

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
            findMatch: jest.fn(),
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

  describe('findMatch', () => {
    it('should return a match result', async () => {
      const mockUserId = 1;
      const mockResult = { matches: [{ user_id: 2, score: 0.95 }] };
      jest.spyOn(service, 'findMatch').mockResolvedValue(mockResult);

      expect(await controller.findMatch(mockUserId)).toBe(mockResult);
      expect(service.findMatch).toHaveBeenCalledWith(mockUserId);
    });

    it('should handle no match found', async () => {
      const mockUserId = 1;
      const mockResult = { matches: [] };
      jest.spyOn(service, 'findMatch').mockResolvedValue(mockResult);

      expect(await controller.findMatch(mockUserId)).toBe(mockResult);
      expect(service.findMatch).toHaveBeenCalledWith(mockUserId);
    });

    it('should handle errors', async () => {
      const mockUserId = 1;
      const mockError = new Error('Some error occurred');
      jest.spyOn(service, 'findMatch').mockRejectedValue(mockError);

      await expect(controller.findMatch(mockUserId)).rejects.toThrowError(mockError);
      expect(service.findMatch).toHaveBeenCalledWith(mockUserId);
    });
  });
});

```