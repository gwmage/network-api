```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityController } from '../src/community/community.controller';
import { CommunityService } from '../src/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Community } from '../src/community/community.entity';
import { Repository } from 'typeorm';
import { CreateCommunityDto } from '../src/community/dto/create-community.dto';
import { UpdateCommunityDto } from '../src/community/dto/update-community.dto';
import { CreateCommentDto } from '../src/community/dto/create-comment.dto';
import { Comment } from '../src/community/comment.entity';
import { PageOptionsDto } from '../src/common/dtos/page-options.dto';

describe('CommunityController', () => {
  let controller: CommunityController;
  let service: CommunityService;
  let communityRepository: Repository<Community>;
  let commentRepository: Repository<Comment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityController],
      providers: [
        CommunityService,
        {
          provide: getRepositoryToken(Community),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CommunityController>(CommunityController);
    service = module.get<CommunityService>(CommunityService);
    communityRepository = module.get<Repository<Community>>(getRepositoryToken(Community));
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCommunity', () => {
    it('should create a new community post', async () => {
      const createCommunityDto: CreateCommunityDto = { title: 'Test Title', content: 'Test Content' };
      const createdCommunity: Community = { id: 1, ...createCommunityDto };
      jest.spyOn(service, 'createCommunity').mockResolvedValue(createdCommunity);

      expect(await controller.createCommunity(createCommunityDto)).toEqual(createdCommunity);
    });
  });

  describe('updateCommunity', () => {
    it('should update an existing community post', async () => {
      const postId = 1;
      const updateCommunityDto: UpdateCommunityDto = { title: 'Updated Title', content: 'Updated Content' };
      const updatedCommunity: Community = { id: postId, ...updateCommunityDto };
      jest.spyOn(service, 'updateCommunity').mockResolvedValue(updatedCommunity);

      expect(await controller.updateCommunity(postId, updateCommunityDto)).toEqual(updatedCommunity);
    });
  });

  describe('deleteCommunity', () => {
    it('should delete a community post', async () => {
      const postId = 1;
      jest.spyOn(service, 'deleteCommunity').mockResolvedValue(undefined);

      expect(await controller.deleteCommunity(postId)).toBeUndefined();
    });
  });

  describe('findAll', () => {
    it('should return an array of community posts', async () => {
      const pageOptionsDto: PageOptionsDto = { page: 1, limit: 10 };
      const communities: Community[] = [{ id: 1, title: 'Test Title 1', content: 'Test Content 1' }, { id: 2, title: 'Test Title 2', content: 'Test Content 2' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(communities);

      expect(await controller.findAll(pageOptionsDto)).toEqual(communities);
    });
  });

  describe('createComment', () => {
    it('should create a new comment', async () => {
      const postId = 1;
      const createCommentDto: CreateCommentDto = { content: 'Test Comment' };
      const createdComment: Comment = { id: 1, ...createCommentDto, post: { id: postId } as Community };
      jest.spyOn(service, 'createComment').mockResolvedValue(createdComment);

      expect(await controller.createComment(postId, createCommentDto)).toEqual(createdComment);
    });
  });

  describe('getComments', () => {
    it('should return an array of comments for a post', async () => {
      const postId = 1;
      const comments: Comment[] = [{ id: 1, content: 'Test Comment', post: { id: postId } as Community }];
      jest.spyOn(service, 'getComments').mockResolvedValue(comments);

      expect(await controller.getComments(postId)).toEqual(comments);
    });
  });
});

```