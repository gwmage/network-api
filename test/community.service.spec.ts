```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from '../src/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Community } from '../src/community/community.entity';
import { Repository } from 'typeorm';
import { User } from '../src/users/user.entity';
import { CreateCommunityDto } from '../src/community/dto/create-community.dto';
import { UpdateCommunityDto } from '../src/community/dto/update-community.dto';
import { Comment } from '../src/community/comment.entity';
import { CreateCommentDto } from '../src/community/dto/create-comment.dto';
import { UpdateCommentDto } from '../src/community/dto/update-comment.dto';
import { PageOptionsDto } from '../src/common/dtos/page-options.dto';
import { PageMetaDto } from '../src/common/dtos/page-meta.dto';
import { PageDto } from '../src/common/dtos/page.dto';
import { NotFoundException } from '@nestjs/common';


describe('CommunityService', () => {
  let service: CommunityService;
  let communityRepository: Repository<Community>;
  let userRepository: Repository<User>;
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
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
    communityRepository = module.get<Repository<Community>>(getRepositoryToken(Community));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ... (Existing tests)

  describe('createComment', () => {
    it('should create a comment for a post', async () => {
      const postId = 1;
      const createCommentDto: CreateCommentDto = { content: 'Test Comment' };
      const createdComment = { id: 1, ...createCommentDto } as Comment;
      const user = { id: 1 } as User;
      const community = { id: postId } as Community;

      jest.spyOn(communityRepository, 'findOne').mockResolvedValue(community);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(createdComment);


      const result = await service.createComment(postId, createCommentDto, user);

      expect(result).toEqual(createdComment);
      expect(commentRepository.save).toHaveBeenCalledWith({ ...createCommentDto, author: user, post: community });

    });
    it('should throw error if no community post found ', async () => {
      const postId = 1;
      const createCommentDto = { content: 'Test Comment content' };
      const user = { id: 1, username: 'testuser' } as User;

      jest.spyOn(communityRepository, 'findOne').mockResolvedValue(undefined);


      await expect(service.createComment(postId, createCommentDto, user)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateComment', () => {
    it('should update an existing comment', async () => {

      const updateCommentDto: UpdateCommentDto = { content: 'Updated Comment Content' };
      const commentId = 1;
      const updatedComment = { id: commentId, ...updateCommentDto } as Comment;


      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(updatedComment);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(updatedComment);

      const result = await service.updateComment(commentId, updateCommentDto);
      expect(result).toEqual(updatedComment);
    });
  });



  describe('removeComment', () => {
    it('should remove a comment', async () => {

      const commentId = 1;

      jest.spyOn(commentRepository, 'delete').mockResolvedValue({ affected: 1 });
      await service.removeComment(commentId);
      expect(commentRepository.delete).toHaveBeenCalledWith(commentId);

    });
  });
});

```