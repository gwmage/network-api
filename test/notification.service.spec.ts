```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../src/notification/notification.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notification } from '../src/notification/notification.entity';
import { Repository } from 'typeorm';
import { User } from '../src/users/user.entity';
import { Comment } from '../src/community/comment.entity';
import { Community } from '../src/community/community.entity';

describe('NotificationService', () => {
  let service: NotificationService;
  let notificationRepository: Repository<Notification>;
  let commentRepository: Repository<Comment>;
  let communityRepository: Repository<Community>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: getRepositoryToken(Notification),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Community),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    notificationRepository = module.get<Repository<Notification>>(getRepositoryToken(Notification));
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
    communityRepository = module.get<Repository<Community>>(getRepositoryToken(Community));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCommentNotification', () => {
    it('should create a notification for a new comment', async () => {
      const comment = new Comment();
      comment.id = 1;
      comment.content = 'Test comment';
      const post = new Community();
      post.id = 1;
      comment.post = post;
      const user = new User();
      user.id = 1;
      comment.user = user;

      const createdNotification = new Notification();
      createdNotification.id = 1;

      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(comment);
      jest.spyOn(notificationRepository, 'create').mockReturnValue(createdNotification);
      jest.spyOn(notificationRepository, 'save').mockResolvedValue(createdNotification);

      const result = await service.createCommentNotification(comment.id);
      expect(result).toEqual(createdNotification);
    });

    it('should handle errors when creating a comment notification', async () => {
      const commentId = 1;
      const error = new Error('Failed to create notification');

      jest.spyOn(commentRepository, 'findOne').mockRejectedValue(error);

      await expect(service.createCommentNotification(commentId)).rejects.toThrowError(error);
    });
  });
});

```