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
import { PaginationQueryDto } from '../src/community/dto/pagination-query.dto';

describe('CommunityController', () => {
  // ... existing code ...

  describe('createComment', () => {
    it('should create a new comment', async () => {
      const postId = 1;
      const createCommentDto: CreateCommentDto = { content: 'Test Comment' };
      const createdComment: Comment = { id: 1, ...createCommentDto, post: { id: postId } as Community, parent: null };
      jest.spyOn(service, 'createComment').mockResolvedValue(createdComment);

      expect(await controller.createComment(postId, createCommentDto)).toEqual(createdComment);
    });

    it('should create a nested comment', async () => {
      const postId = 1;
      const parentCommentId = 2;
      const createCommentDto: CreateCommentDto = { content: 'Nested Test Comment', parent: parentCommentId};
      const createdComment: Comment = { id: 3, ...createCommentDto, post: { id: postId } as Community, parent: {id: parentCommentId} as Comment };
      jest.spyOn(service, 'createComment').mockResolvedValue(createdComment);

      expect(await controller.createComment(postId, createCommentDto)).toEqual(createdComment);

    });


    it('should throw NotFoundException if post not found', async () => {
      const postId = 999;
      const createCommentDto: CreateCommentDto = { content: 'Test Comment' };

      jest.spyOn(service, 'createComment').mockRejectedValue(new NotFoundException('Post not found'));

      await expect(controller.createComment(postId, createCommentDto)).rejects.toThrowError(NotFoundException);
    });
  });


  describe('getComments', () => {
    it('should return an array of comments for a post', async () => {
      const postId = 1;
      const comments: Comment[] = [{ id: 1, content: 'Test Comment', post: { id: postId } as Community, parent: null }];
      jest.spyOn(service, 'getComments').mockResolvedValue(comments);

      expect(await controller.getComments(postId)).toEqual(comments);
    });

    it('should return an empty array if no comments found', async () => {
      const postId = 1;
      jest.spyOn(service, 'getComments').mockResolvedValue([]);

      expect(await controller.getComments(postId)).toEqual([]);
    });


  });



});

```