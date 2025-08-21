```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from '../src/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Community } from '../src/community/entities/community.entity';
import { Comment } from '../src/community/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../src/community/dto/create-comment.dto';
import { NotFoundException } from '@nestjs/common';

describe('CommunityService', () => {
  let service: CommunityService;
  let commentRepository: Repository<Comment>;

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
      ],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createComment', () => {
    it('should create a comment', async () => {
      const postId = 1;
      const createCommentDto: CreateCommentDto = { content: 'Test Comment' };
      const createdComment: Comment = { id: 1, ...createCommentDto, post: { id: postId } as Community };
      jest.spyOn(commentRepository, 'save').mockResolvedValue(createdComment);
      jest.spyOn(commentRepository, 'create').mockReturnValue(createdComment);

      expect(await service.createComment(postId, createCommentDto)).toEqual(createdComment);
    });
  });


  describe('getComments', () => {
    it('should return an array of comments for a post', async () => {
      const postId = 1;
      const comments: Comment[] = [{ id: 1, content: 'Test Comment', post: { id: postId } as Community }];
      jest.spyOn(commentRepository, 'find').mockResolvedValue(comments);

      expect(await service.getComments(postId)).toEqual(comments);
    });
  });

  describe('removeComment', () => {
    it('should remove a comment', async () => {
      const postId = 1;
      const id = 1;
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue({ id: id, post: { id: postId } } as Comment);
      jest.spyOn(commentRepository, 'remove').mockResolvedValue(undefined);

      await service.removeComment(postId, id);
    });

    it('should throw NotFoundException if comment is not found when deleting comment', async () => {
      const postId = 1;
      const id = 1;
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.removeComment(postId, id)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if comment does not belong to post', async () => {
      const postId = 1;
      const id = 1;
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue({ id: id, post: { id: 2 } } as Comment);


      await expect(service.removeComment(postId, id)).rejects.toThrow(NotFoundException);
    });
  });


});

```