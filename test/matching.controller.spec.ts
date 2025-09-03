import { Test, TestingModule } from '@nestjs/testing';
import { MatchingController } from '../src/modules/matching/matching.controller';
import { MatchingService } from '../src/modules/matching/matching.service';

describe('MatchingController', () => {
  let controller: MatchingController;
  let service: MatchingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchingController],
      providers: [MatchingService],
    }).compile();

    controller = module.get<MatchingController>(MatchingController);
    service = module.get<MatchingService>(MatchingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('triggerMatching', () => {
    it('should trigger the matching process', async () => {
      const triggerSpy = jest.spyOn(service, 'triggerMatching');
      await controller.triggerMatching();
      expect(triggerSpy).toHaveBeenCalled();
    });
  });

  describe('getMatchingStatus', () => {
    it('should return the matching status', async () => {
      jest.spyOn(service, 'getMatchingStatus').mockResolvedValue({ status: 'idle' });
      expect(await controller.getMatchingStatus()).toEqual({ status: 'idle' });
    });
  });
});
