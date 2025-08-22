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
    it('should create a comment and send notification', async () => {
      const postId = 1;
      const createCommentDto = { content: 'Test comment' };
      const createdComment = { id: 1, ...createCommentDto, post: { id: postId } as Community, user: { id: 1 } };
      jest.spyOn(commentRepository, 'create').mockReturnValue(createdComment);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(createdComment);

      const result = await service.createComment(postId, createCommentDto);
      expect(result).toEqual(createdComment);
      expect(notificationService.sendCommentNotification).toHaveBeenCalledWith(createdComment);
    });

    it('should create a nested comment and send notification', async () => {
      const postId = 1;
      const parentCommentId = 2;
      const createCommentDto = { content: 'Test comment', parentCommentId };
      const createdComment = { id: 3, ...createCommentDto, post: { id: postId } as Community, parent: { id: parentCommentId } as Comment, user: { id: 1 } };
      jest.spyOn(commentRepository, 'create').mockReturnValue(createdComment);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(createdComment);

      const result = await service.createComment(postId, createCommentDto);
      expect(result).toEqual(createdComment);
      expect(notificationService.sendCommentNotification).toHaveBeenCalledWith(createdComment);
    });
  });
});

```