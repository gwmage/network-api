import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../../src/modules/profile/profile.controller';
import { ProfileService } from '../../src/modules/profile/profile.service';

console.log('Current working directory:', process.cwd());
console.log('NODE_PATH:', process.env.NODE_PATH);

describe('ProfileController', () => {
  let controller: ProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
