```typescript
// Placeholder for tests (Implementation needed)
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityController } from '../src/modules/community/community.controller';
import { CommunityService } from '../src/modules/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../src/modules/community/entities/post.entity';
import { Comment } from '../src/modules/community/entities/comment.entity';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from 'src/modules/community/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/modules/community/dto/update-comment.dto';
import { NotFoundException } from '@nestjs/common';
import { NotificationService } from 'src/modules/notification/notification.service';
import { Notification } from 'src/modules/notification/entities/notification.entity';




describe('CommunityController', () => {
  let controller: CommunityController;
  let service: CommunityService;
  let postRepository: Repository<Post>;
  let commentRepository: Repository<Comment>;
  let notificationService: NotificationService;



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityController],
      providers: [
        CommunityService,
        {
          provide: getRepositoryToken(Post),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
        {
          provide: NotificationService,
          useValue: {
            createNotification: jest.fn(),
          },
        },

      ],
    }).compile();

    controller = module.get<CommunityController>(CommunityController);
    service = module.get<CommunityService>(CommunityService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
    notificationService = module.get<NotificationService>(NotificationService)

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('createComment', () => {
    it('should create a comment', async () => {
      const postId = 1;
      const createCommentDto: CreateCommentDto = {
        content: 'Test comment',
        parentCommentId: null,
        itemId: '1'
      };

      const mockUser: User = { id: 1, username: 'testuser', email: 'test@example.com', password: 'password', posts: [], comments: [] };
      const mockComment: Comment = { id: 1, content: 'Test comment', author: mockUser, post: { id: postId } as Post, createdAt: new Date(), updatedAt: new Date(), parentCommentId: null, replies: [], parentComment: null, notifications: [] };
      jest.spyOn(service, 'createComment').mockResolvedValue(mockComment);

      const result = await controller.createComment(postId, createCommentDto, mockUser);

      expect(result).toEqual(mockComment);
      expect(service.createComment).toHaveBeenCalledWith(postId, createCommentDto, mockUser);
    });


  });



  describe('findAllComments', () => {
    it('should find all comments for a post', async () => {
      const postId = 1;
      const mockComments: Comment[] = [
        { id: 1, content: 'Comment 1', author: {} as User, post: {} as Post, createdAt: new Date(), updatedAt: new Date(), notifications: [] } as Comment,
        { id: 2, content: 'Comment 2', author: {} as User, post: {} as Post, createdAt: new Date(), updatedAt: new Date(), notifications: [] } as Comment,

      ];

      jest.spyOn(service, 'findAllCommentsByPost').mockResolvedValue(mockComments);

      const result = await controller.findAllComments(postId);
      expect(result).toEqual(mockComments);
      expect(service.findAllCommentsByPost).toHaveBeenCalledWith(postId, undefined);


    });

  });



  describe('findOneComment', () => {

    it('should find a comment by ID', async () => {
      const commentId = 1;
      const mockComment: Comment = { id: commentId, content: 'Test comment', author: {} as User, post: {} as Post, createdAt: new Date(), updatedAt: new Date(), notifications: [] } as Comment;

      jest.spyOn(service, 'findOneComment').mockResolvedValue(mockComment);

      const result = await controller.findOneComment(commentId);
      expect(result).toEqual(mockComment);
      expect(service.findOneComment).toHaveBeenCalledWith(commentId);

    });


    it('should throw NotFoundException if comment not found', async () => {

      const commentId = 1;

      jest.spyOn(service, 'findOneComment').mockResolvedValue(null);


      await expect(controller.findOneComment(commentId)).rejects.toThrow(NotFoundException);


    });

  });


  describe('updateComment', () => {

    it('should update a comment', async () => {

      const commentId = 1;
      const updateCommentDto: UpdateCommentDto = { content: 'Updated comment' };
      const mockComment: Comment = { id: commentId, content: 'Updated comment', author: {} as User, post: {} as Post, createdAt: new Date(), updatedAt: new Date(), notifications: [] } as Comment;
      jest.spyOn(service, 'updateComment').mockResolvedValue(mockComment);


      const result = await controller.updateComment(commentId, updateCommentDto);

      expect(result).toEqual(mockComment);
      expect(service.updateComment).toHaveBeenCalledWith(commentId, updateCommentDto);
    });



    it('should throw NotFoundException if comment not found', async () => {
      const commentId = 1;
      const updateCommentDto: UpdateCommentDto = { content: 'Updated comment' };
      jest.spyOn(service, 'updateComment').mockResolvedValue(null);

      await expect(controller.updateComment(commentId, updateCommentDto)).rejects.toThrow(NotFoundException);


    });

  });


  describe('removeComment', () => {
    it('should remove a comment', async () => {

      const commentId = 1;
      jest.spyOn(service, 'removeComment').mockResolvedValue(undefined);


      const result = await controller.removeComment(commentId);


      expect(result).toEqual({ message: 'Comment deleted successfully.' });

      expect(service.removeComment).toHaveBeenCalledWith(commentId);


    });

  });


});



```