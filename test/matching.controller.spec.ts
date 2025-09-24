import { Test, TestingModule } from '@nestjs/testing';
import { MatchingController } from '../src/modules/matching/matching.controller';
import { MatchingService } from '../src/modules/matching/matching.service';

console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('Importing MatchingController from:', '../src/modules/matching/matching.controller');
console.log('Importing MatchingService from:', '../src/modules/matching/matching.service');

describe('MatchingController', () => {
  let controller: MatchingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchingController],
      providers: [MatchingService],
    }).compile();

    controller = module.get<MatchingController>(MatchingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
