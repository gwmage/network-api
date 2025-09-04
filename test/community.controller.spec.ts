```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityController } from '../src/modules/community/community.controller';
import { CommunityService } from '../src/modules/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../src/modules/community/entities/post.entity';
import { Comment } from '../src/modules/community/entities/comment.entity';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../src/modules/community/dto/create-post.dto';
import { UpdatePostDto } from '../src/modules/community/dto/update-post.dto';
import { CreateCommentDto } from 'src/modules/community/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/modules/community/dto/update-comment.dto';
import { NotFoundException } from '@nestjs/common';
import { NotificationService } from 'src/modules/notification/notification.service';
import { Category } from 'src/modules/community/entities/category.entity';
import { Tag } from 'src/modules/community/entities/tag.entity';




describe('CommunityController', () => {
  let controller: CommunityController;
  let service: CommunityService;
  let postRepository: Repository<Post>;
  let commentRepository: Repository<Comment>;
  let categoryRepository: Repository<Category>;
  let tagRepository: Repository<Tag>;


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
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Tag),
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
    categoryRepository = module.get<Repository<Category>>(getRepositoryToken(Category));
    tagRepository = module.get<Repository<Tag>>(getRepositoryToken(Tag));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPost', () => {
    it('should create a post', async () => {
      const createPostDto: CreatePostDto = { title: 'Test Title', content: 'Test Content', categoryIds: [1, 2], tagIds: [1, 2] };
      const mockUser: User = { id: 1, username: 'testuser', email: 'test@example.com', password: 'password', posts: [], comments: [] };
      const mockPost: Post = { id: 1, ...createPostDto, author: mockUser, createdAt: new Date(), updatedAt: new Date(), comments: [], commentCount: 0, categories: [], tags: [] };
      jest.spyOn(service, 'createPost').mockResolvedValue(mockPost);
      const result = await controller.createPost(createPostDto, mockUser);
      expect(result).toEqual(mockPost);
      expect(service.createPost).toHaveBeenCalledWith(createPostDto, mockUser);
    });
  });

  describe('findAllPosts', () => {
    it('should return paginated posts with filtering and search', async () => {
      const page = 1;
      const pageSize = 10;
      const categories = [1, 2];
      const tags = [1, 2];
      const search = 'test';
      const mockPosts: Post[] = [{ id: 1, title: 'Test Title', content: 'Test Content', author: {} as User, createdAt: new Date(), updatedAt: new Date(), comments: [], commentCount: 0, categories: [], tags: [] }];
      const totalCount = mockPosts.length;

      jest.spyOn(service, 'findAllPosts').mockResolvedValue({ posts: mockPosts, totalCount });

      const result = await controller.findAllPosts(page, pageSize, categories, tags, search);

      expect(result).toEqual({ posts: mockPosts, totalCount });
      expect(service.findAllPosts).toHaveBeenCalledWith(page, pageSize, categories, tags, search);


    });
  });

  describe('findOnePost', () => {
    it('should find a post by ID', async () => {
      const id = 1;
      const mockPost: Post = { id, title: 'Test Title', content: 'Test Content', author: {} as User, createdAt: new Date(), updatedAt: new Date(), comments: [], commentCount: 0, categories: [], tags: [] };
      jest.spyOn(service, 'findOnePost').mockResolvedValue(mockPost);
      const result = await controller.findOnePost(id);
      expect(result).toEqual(mockPost);
      expect(service.findOnePost).toHaveBeenCalledWith(id);

    });
  });


  describe('updatePost', () => {
    it('should update a post', async () => {
      const id = 1;
      const updatePostDto: UpdatePostDto = { title: 'Updated Title', content: 'Updated Content', categoryIds: [2,3], tagIds: [2,3] };
      const mockUser: User = { id: 1, username: 'testuser', email: 'test@example.com', password: 'password', posts: [], comments: [] };

      const mockPost: Post = { id, ...updatePostDto, author: mockUser, createdAt: new Date(), updatedAt: new Date(), comments: [], commentCount: 0, categories: [], tags: [] };


      jest.spyOn(service, 'updatePost').mockResolvedValue(mockPost);

      const result = await controller.updatePost(id, updatePostDto, mockUser);
      expect(result).toEqual(mockPost);
      expect(service.updatePost).toHaveBeenCalledWith(id, updatePostDto, mockUser);


    });

  });


  describe('removePost', () => {
    it('should remove a post', async () => {

      const id = 1;

      const mockUser: User = { id: 1, username: 'testuser', email: 'test@example.com', password: 'password', posts: [], comments: [] };

      jest.spyOn(service, 'removePost').mockResolvedValue(undefined);


      const result = await controller.removePost(id, mockUser);


      expect(result).toBeUndefined();
      expect(service.removePost).toHaveBeenCalledWith(id, mockUser);

    });
  });

  describe('createComment', () => {
    it('should create a comment', async () => {
      const postId = 1;
      const createCommentDto: CreateCommentDto = {
        content: 'Test comment',
        parentCommentId: null,

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