```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from '../src/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Community } from '../src/community/community.entity';
import { Repository } from 'typeorm';
import { Comment } from '../src/community/comment.entity';
import { NotFoundException } from '@nestjs/common';
import { NotificationService } from '../src/notification/notification.service';

describe('CommunityService', () => {
  let service: CommunityService;
  let communityRepository: Repository<Community>;
  let commentRepository: Repository<Comment>;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        {
          provide: NotificationService,
          useValue: {
            sendCommentNotification: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
    communityRepository = module.get<Repository<Community>>(getRepositoryToken(Community));
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createComment', () => {
    // ... existing tests
  });

  describe('updateComment', () => {
    it('should update a comment', async () => {
      const commentId = 1;
      const updateCommentDto = { content: 'Updated comment' };
      const existingComment = { id: commentId, content: 'Original comment' } as Comment;
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(existingComment);
      jest.spyOn(commentRepository, 'save').mockResolvedValue({ id: commentId, ...updateCommentDto } as Comment);

      const result = await service.updateComment(commentId, updateCommentDto);
      expect(result).toEqual({ id: commentId, ...updateCommentDto });
    });

    it('should throw NotFoundException if comment is not found', async () => {
      const commentId = 1;
      const updateCommentDto = { content: 'Updated comment' };
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.updateComment(commentId, updateCommentDto)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('deleteComment', () => {
    it('should delete a comment', async () => {
      const commentId = 1;
      jest.spyOn(commentRepository, 'delete').mockResolvedValue({ affected: 1 });

      await service.deleteComment(commentId);
      expect(commentRepository.delete).toHaveBeenCalledWith(commentId);
    });

    it('should throw NotFoundException if comment is not found', async () => {
      const commentId = 1;
      jest.spyOn(commentRepository, 'delete').mockResolvedValue({ affected: 0 });

      await expect(service.deleteComment(commentId)).rejects.toThrowError(NotFoundException);
    });
  });
});

```