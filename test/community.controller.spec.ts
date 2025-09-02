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
import { UpdateCommentDto } from '../src/community/dto/update-comment.dto';
import { PaginationQueryDto } from '../src/common/dtos/pagination-query.dto';
import { User } from '../src/users/user.entity';

describe('CommunityController', () => {
  // ... (Existing setup code)

  describe('findOne', () => {
    it('should return a community post by ID', async () => {
      const postId = 1;
      const communityPost: Community = { id: postId, title: 'Test Title', content: 'Test Content' };
      jest.spyOn(service, 'findOne').mockResolvedValue(communityPost);

      expect(await controller.findOne(postId)).toEqual(communityPost);
    });

    it('should throw NotFoundException if post is not found', async () => {
      const postId = 999;
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(postId)).rejects.toThrow(NotFoundException);
    });
  });


  describe('createComment', () => {
    it('should create a new comment', async () => {
      const postId = 1;
      const createCommentDto: CreateCommentDto = { content: 'New Comment' };
      const createdComment: Comment = { id: 1, ...createCommentDto, post: { id: postId } as Community, author: { id: 1 } as User };
      jest.spyOn(service, 'createComment').mockResolvedValue(createdComment);

      expect(await controller.createComment(postId, createCommentDto, { user: { id: 1 } as User })).toEqual(createdComment);
    });

    it('should throw NotFoundException if post not found', async () => {
      const postId = 999;
      const createCommentDto: CreateCommentDto = { content: 'New Comment' };
      jest.spyOn(service, 'createComment').mockRejectedValue(new NotFoundException('Post not found'));

      await expect(controller.createComment(postId, createCommentDto, { user: { id: 1 } as User })).rejects.toThrowError(NotFoundException);
    });
  });

  // ... (Existing tests for updateComment, deleteComment)
});

```