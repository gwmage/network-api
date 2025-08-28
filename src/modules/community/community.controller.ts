```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, ParseIntPipe, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FindPostQueryDto } from './dto/find-post-query.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../user/entities/user.entity';


@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // ... other methods

  @Get('search')
  async searchPosts(@Query() searchPostDto: SearchPostDto) {
    try {
      return await this.communityService.searchPosts(searchPostDto);
    } catch (error) {
      throw new Error('Failed to search posts');
    }
  }


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

  // ... other methods
}

```