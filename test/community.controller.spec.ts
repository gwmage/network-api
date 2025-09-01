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
import { NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../src/community/dto/pagination-query.dto';
import { UpdateCommentDto } from '../src/community/dto/update-comment.dto';
import { User } from '../src/user/user.entity';

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

  // ... (Existing tests for createCommunity, findAll, updateCommunity, deleteCommunity)

  describe('createComment', () => {
    it('should create a new comment', async () => {
      const postId = 1;
      const createCommentDto: CreateCommentDto = { content: 'New Comment' };
      const createdComment: Comment = { id: 1, ...createCommentDto, post: { id: postId } as Community };
      jest.spyOn(service, 'createComment').mockResolvedValue(createdComment);

      expect(await controller.createComment(postId, createCommentDto, {user: {id: 1} as User})).toEqual(createdComment);
    });

    it('should throw NotFoundException if post not found', async () => {
      const postId = 999;
      const createCommentDto: CreateCommentDto = { content: 'New Comment' };
      jest.spyOn(service, 'createComment').mockRejectedValue(new NotFoundException('Post not found'));

      await expect(controller.createComment(postId, createCommentDto, {user: {id: 1} as User})).rejects.toThrowError(NotFoundException);
    });
  });

  describe('updateComment', () => {
    // ... (Existing tests for updateComment)
  });

  describe('deleteComment', () => {
    // ... (Existing tests for deleteComment)
  });
});

```