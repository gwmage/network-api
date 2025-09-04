```typescript
// Placeholder for tests (Implementation needed)
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from '../src/modules/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../src/modules/community/entities/post.entity';
import { Comment } from '../src/modules/community/entities/comment.entity';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from 'src/modules/community/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/modules/community/dto/update-comment.dto';
import { NotificationService } from 'src/modules/notification/notification.service';
import { Notification } from 'src/modules/notification/entities/notification.entity';
import { NotFoundException } from '@nestjs/common';





describe('CommunityService', () => {
  let service: CommunityService;
  let postRepository: Repository<Post>;
  let commentRepository: Repository<Comment>;
  let notificationService: NotificationService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

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

    service = module.get<CommunityService>(CommunityService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
    notificationService = module.get<NotificationService>(NotificationService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
      const mockPost = { id: postId } as Post;

      jest.spyOn(postRepository, 'findOneBy').mockResolvedValue(mockPost);
      jest.spyOn(commentRepository, 'create').mockReturnValue(mockComment);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(mockComment);


      const result = await service.createComment(postId, createCommentDto, mockUser);


      expect(result).toEqual(mockComment);
      expect(commentRepository.create).toHaveBeenCalledWith({
        ...createCommentDto,
        post: mockPost,
        author: mockUser,
        parentComment: null
      });
      expect(commentRepository.save).toHaveBeenCalledWith(mockComment);


    });



    it('should throw NotFoundException if post not found', async () => {

      const postId = 1;
      const createCommentDto: CreateCommentDto = { content: 'Test comment', parentCommentId: null, itemId: '1' };
      const mockUser: User = { id: 1, username: 'testuser', email: 'test@example.com', password: 'password', posts: [], comments: [] };

      jest.spyOn(postRepository, 'findOneBy').mockResolvedValue(null);


      await expect(service.createComment(postId, createCommentDto, mockUser)).rejects.toThrow(NotFoundException);


    });

  });





  describe('findAllCommentsByPost', () => {
    it('should find all comments for a post', async () => {
      const postId = 1;
      const mockComments: Comment[] = [
        { id: 1, content: 'Comment 1', author: {} as User, post: {} as Post, createdAt: new Date(), updatedAt: new Date(), notifications: [] } as Comment,
        { id: 2, content: 'Comment 2', author: {} as User, post: {} as Post, createdAt: new Date(), updatedAt: new Date(), notifications: [] } as Comment,

      ];
      jest.spyOn(commentRepository, 'find').mockResolvedValue(mockComments);


      const result = await service.findAllCommentsByPost(postId);

      expect(result).toEqual(mockComments);
      expect(commentRepository.find).toHaveBeenCalledWith({ where: { post: { id: postId } }, relations: ['author', 'replies'] });


    });

  });


  describe('findOneComment', () => {
    it('should find a comment by ID', async () => {

      const commentId = 1;

      const mockComment: Comment = { id: commentId, content: 'Test comment', author: {} as User, post: {} as Post, createdAt: new Date(), updatedAt: new Date(), notifications: [] } as Comment;

      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(mockComment);


      const result = await service.findOneComment(commentId);


      expect(result).toEqual(mockComment);

      expect(commentRepository.findOne).toHaveBeenCalledWith({ where: { id: commentId }, relations: ['author', 'replies'] });


    });



    it('should throw NotFoundException if comment not found', async () => {

      const commentId = 1;

      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(null);



      await expect(service.findOneComment(commentId)).rejects.toThrow(NotFoundException);



    });


  });





  describe('updateComment', () => {

    it('should update a comment', async () => {

      const commentId = 1;

      const updateCommentDto: UpdateCommentDto = { content: 'Updated comment' };

      const mockComment: Comment = { id: commentId, content: 'Test comment', author: {} as User, post: { id: 1 } as Post, createdAt: new Date(), updatedAt: new Date(), notifications: [] } as Comment;

      jest.spyOn(commentRepository, 'findOneBy').mockResolvedValue(mockComment);
      jest.spyOn(commentRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(service, 'findOneComment').mockResolvedValue({ ...mockComment, content: 'Updated comment' });


      const result = await service.updateComment(commentId, updateCommentDto);

      expect(result.content).toEqual('Updated comment');
      expect(commentRepository.update).toHaveBeenCalledWith({ id: commentId }, updateCommentDto);


    });



    it('should throw NotFoundException if comment not found', async () => {
      const commentId = 1;
      const updateCommentDto: UpdateCommentDto = { content: 'Updated comment' };
      jest.spyOn(commentRepository, 'findOneBy').mockResolvedValue(null);


      await expect(service.updateComment(commentId, updateCommentDto)).rejects.toThrow(NotFoundException);


    });


  });



  describe('removeComment', () => {


    it('should remove a comment', async () => {
      const commentId = 1;
      jest.spyOn(commentRepository, 'delete').mockResolvedValue(undefined);


      await service.removeComment(commentId);


      expect(commentRepository.delete).toHaveBeenCalledWith(commentId);


    });

  });




});


```
---[@document]---
```
## Comment API Endpoints Documentation

This document describes the API endpoints for managing comments, including nested comment support and error handling.  It also documents the notification data structure.

**Endpoints:**

* **POST /community/posts/:postId/comments:** Creates a new comment.
    * Request Body:
        * `content` (string, required): The comment text.
        * `parentCommentId` (number, optional): The ID of the parent comment if this is a reply.
        * `itemId` (string, required): ID of the item the comment belongs to (currently Post ID).
    * Response: The newly created comment object.
    * Error Handling:
        * 400 Bad Request: Invalid request body.
        * 404 Not Found: Post not found.
        * 500 Internal Server Error: Database error.
* **GET /community/posts/:postId/comments:** Retrieves all comments for a post.
    * Query Parameters:
      * `parentCommentId` (number, optional): If provided, only retrieves replies to this comment.
    * Response: An array of comment objects.
    * Error Handling:
        * 404 Not Found: Post not found.
        * 500 Internal Server Error: Database error.
* **GET /community/posts/:postId/comments/:id:** Retrieves a specific comment.
    * Response: The comment object.
    * Error Handling:
        * 404 Not Found: Comment not found.
        * 500 Internal Server Error: Database error.
* **PATCH /community/posts/:postId/comments/:id:** Updates a comment.
    * Request Body:
        * `content` (string, optional): The updated comment text.
    * Response: The updated comment object.
    * Error Handling:
        * 400 Bad Request: Invalid request body.
        * 404 Not Found: Comment not found.
        * 500 Internal Server Error: Database error.
* **DELETE /community/posts/:postId/comments/:id:** Deletes a comment.
    * Response: `{ message: 'Comment deleted successfully.' }`
    * Error Handling:
        * 404 Not Found: Comment not found.
        * 500 Internal Server Error: Database error.

**Nested Comment Support:**

The `parentCommentId` field in the create and update DTOs allows for creating and managing nested comments (replies).  When retrieving comments using the GET endpoints, replies can be fetched by providing the `parentCommentId` query parameter.


**Notification Data Structure:**

The `Notification` entity stores basic information about comment notifications:

* `userId` (number): The ID of the user who should receive the notification.
* `commentId` (number): The ID of the comment that triggered the notification.
* `postId` (number):  The ID of the post where the comment was made.
* `timestamp` (Date):  The time the notification was generated.

(Note: The actual notification delivery mechanism is not implemented at this stage.)

```
---[END_OF_FILES]---