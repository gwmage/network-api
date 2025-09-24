// Logging for path resolution debugging
console.log("Expected path to tag.entity:", "src/modules/community/entities/tag.entity");
try {
  const tagEntity = require('src/modules/community/entities/tag.entity');
  console.log("tag.entity imported successfully:", tagEntity);
} catch (error) {
  console.error("Error importing tag.entity:", error);
}
try {
  const tagEntityRelative = require('./tag.entity');
  console.log("tag.entity imported relatively:", tagEntityRelative);
} catch (error) {
  console.error("Error importing tag.entity relatively:", error);
}

import { Test, TestingModule } from '@nestjs/testing';
import { CommunityController } from '../../src/modules/community/community.controller';
import { CommunityService } from '../../src/modules/community/community.service';

describe('CommunityController', () => {
  let controller: CommunityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityController],
      providers: [CommunityService],
    }).compile();

    controller = module.get<CommunityController>(CommunityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
