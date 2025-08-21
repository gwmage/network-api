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

  // ... (Existing tests)

  describe('updateComment', () => {
    it('should update an existing comment', async () => {
      const postId = 1;
      const commentId = 1;
      const updateCommentDto: UpdateCommentDto = { content: 'Updated Comment' };
      const updatedComment: Comment = { id: commentId, ...updateCommentDto, post: { id: postId } as Community };
      jest.spyOn(service, 'updateComment').mockResolvedValue(updatedComment);

      expect(await controller.updateComment(postId, commentId, updateCommentDto)).toEqual(updatedComment);
    });

    it('should throw NotFoundException if comment not found', async () => {
      const postId = 1;
      const commentId = 999;
      const updateCommentDto: UpdateCommentDto = { content: 'Updated Comment' };
      jest.spyOn(service, 'updateComment').mockRejectedValue(new NotFoundException('Comment not found'));

      await expect(controller.updateComment(postId, commentId, updateCommentDto)).rejects.toThrowError(NotFoundException);
    });
  });


  describe('deleteComment', () => {
    it('should delete a comment', async () => {
      const postId = 1;
      const commentId = 1;
      jest.spyOn(service, 'deleteComment').mockResolvedValue(undefined);

      expect(await controller.deleteComment(postId, commentId)).toBeUndefined();
    });

    it('should throw NotFoundException if comment not found', async () => {
      const postId = 1;
      const commentId = 999;
      jest.spyOn(service, 'deleteComment').mockRejectedValue(new NotFoundException('Comment not found'));

      await expect(controller.deleteComment(postId, commentId)).rejects.toThrowError(NotFoundException);
    });
  });
});

```