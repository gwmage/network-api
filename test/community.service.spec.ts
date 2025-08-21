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

  // ... existing tests ...

  describe('Comments', () => {
    it('should create a new comment', async () => {
      const postId = 1;
      const createCommentDto: CreateCommentDto = { content: 'Test Comment' };
      const user: User = { id: 1 } as User;
      const community = { id: postId } as Community;
      const createdComment = { id: 1, ...createCommentDto, user, community } as Comment;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(communityRepository, 'findOne').mockResolvedValue(community);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(createdComment);

      const result = await service.createComment(postId, createCommentDto, user.id);
      expect(result).toEqual(createdComment);
    });

    it('should find all comments for a post', async () => {
      const postId = 1;
      const comments = [{ id: 1 }, { id: 2 }] as Comment[];
      jest.spyOn(commentRepository, 'find').mockResolvedValue(comments);

      const result = await service.findAllComments(postId);
      expect(result).toEqual(comments);
    });

    it('should find one comment by id', async () => {
      const postId = 1;
      const id = 1;
      const comment = { id, postId } as Comment;
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(comment);

      const result = await service.findOneComment(postId, id);
      expect(result).toEqual(comment);
    });

    it('should update a comment', async () => {
      const postId = 1;
      const id = 1;
      const updateCommentDto: UpdateCommentDto = { content: 'Updated Comment' };
      const existingComment = { id, postId, content: 'Original Comment' } as Comment;
      const updatedComment = { id, postId, ...updateCommentDto } as Comment;

      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(existingComment);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(updatedComment);

      const result = await service.updateComment(postId, id, updateCommentDto);
      expect(result).toEqual(updatedComment);
    });

    it('should remove a comment', async () => {
      const postId = 1;
      const id = 1;

      jest.spyOn(commentRepository, 'delete').mockResolvedValue({ affected: 1 });
      await service.removeComment(postId, id);
      expect(commentRepository.delete).toHaveBeenCalledWith({ id, community: { id: postId } });
    });
  });
});

```