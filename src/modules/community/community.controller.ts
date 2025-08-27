```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, ParseIntPipe, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FindPostQueryDto } from './dto/find-post-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../user/entities/user.entity';


@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // ... other methods

  @UseGuards(JwtAuthGuard)
  @Post(':postId/comments')
  async createComment(@Param('postId', ParseIntPipe) postId: number, @Body() createCommentDto: CreateCommentDto, @Req() req: Request) {
    const user = req.user as User;
    try {
      return await this.communityService.createComment(postId, createCommentDto, user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to create comment');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':postId/comments/:id')
  async updateComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: Request
  ) {
    const user = req.user as User;
    try {
      return await this.communityService.updateComment(postId, id, updateCommentDto, user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to update comment');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId/comments/:id')
  async removeComment(@Param('postId', ParseIntPipe) postId: number, @Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as User;
    try {
      return await this.communityService.removeComment(postId, id, user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to delete comment');
    }
  }

  @Get(':postId/comments')
  async findAllComments(@Param('postId', ParseIntPipe) postId: number) {
    try {
      return await this.communityService.findAllComments(postId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to retrieve comments');
    }
  }
}

```