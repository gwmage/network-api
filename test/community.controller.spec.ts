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
import { UpdateCommentDto } from '../src/community/dto/update-comment.dto';
import { PaginationQueryDto } from '../src/common/dtos/pagination-query.dto';


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

  // ... existing tests for createCommunity, updateCommunity, deleteCommunity, findAll

  describe('createComment', () => {
    it('should create a new comment', async () => {
      const postId = 1;
      const createCommentDto: CreateCommentDto = { content: 'Test Comment' };
      const createdComment: Comment = { id: 1, ...createCommentDto, post: { id: postId } as Community };
      jest.spyOn(service, 'createComment').mockResolvedValue(createdComment);

      expect(await controller.createComment(postId, createCommentDto)).toEqual(createdComment);
    });

    it('should throw NotFoundException if post is not found', async () => {
      const postId = 999;
      const createCommentDto: CreateCommentDto = { content: 'Test Comment' };
      jest.spyOn(service, 'createComment').mockRejectedValue(new NotFoundException());

      await expect(controller.createComment(postId, createCommentDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateComment', () => {
    it('should update an existing comment', async () => {
      const postId = 1;
      const commentId = 1;
      const updateCommentDto: UpdateCommentDto = { content: 'Updated Comment' };
      const updatedComment: Comment = { id: commentId, ...updateCommentDto, post: { id: postId } as Community };
      jest.spyOn(service, 'updateComment').mockResolvedValue(updatedComment);

      expect(await controller.updateComment(postId, commentId, updateCommentDto)).toEqual(updatedComment);
    });

    it('should throw NotFoundException if comment is not found', async () => {
      const postId = 1;
      const commentId = 999;
      const updateCommentDto: UpdateCommentDto = { content: 'Updated Comment' };
      jest.spyOn(service, 'updateComment').mockRejectedValue(new NotFoundException());

      await expect(controller.updateComment(postId, commentId, updateCommentDto)).rejects.toThrow(NotFoundException);
    });
  });


  describe('deleteComment', () => {
    it('should delete a comment', async () => {
      const postId = 1;
      const commentId = 1;
      jest.spyOn(service, 'deleteComment').mockResolvedValue(undefined);

      expect(await controller.deleteComment(postId, commentId)).toBeUndefined();
    });

    it('should throw NotFoundException if comment is not found', async () => {
      const postId = 1;
      const commentId = 999;
      jest.spyOn(service, 'deleteComment').mockRejectedValue(new NotFoundException());

      await expect(controller.deleteComment(postId, commentId)).rejects.toThrow(NotFoundException);
    });
  });



  describe('getComments', () => {
    it('should return an array of comments for a post', async () => {
      const postId = 1;
      const comments: Comment[] = [{ id: 1, content: 'Test Comment', post: { id: postId } as Community }];
      jest.spyOn(service, 'getComments').mockResolvedValue(comments);

      expect(await controller.getComments(postId)).toEqual(comments);
    });

    it('should throw NotFoundException if post is not found', async () => {
      const postId = 999;
      jest.spyOn(service, 'getComments').mockRejectedValue(new NotFoundException());

      await expect(controller.getComments(postId)).rejects.toThrow(NotFoundException);

    });
  });


  describe('findAll with pagination', () => {
    it('should return paginated community posts', async () => {
      const page = 1;
      const limit = 10;
      const communities: Community[] = [{ id: 1, title: 'Test Title 1', content: 'Test Content 1' }, { id: 2, title: 'Test Title 2', content: 'Test Content 2' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(communities);

      expect(await controller.findAll({ page, limit } as PaginationQueryDto)).toEqual(communities); // Adjust expectations as needed based on your pagination implementation
    });
  });


});

```