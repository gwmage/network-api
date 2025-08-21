```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
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
  createComment(@Param('postId', ParseIntPipe) postId: number, @Body() createCommentDto: CreateCommentDto, @Req() req: Request) {
    const user = req.user as User;
    return this.communityService.createComment(postId, createCommentDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':postId/comments/:id')
  updateComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: Request
  ) {
    const user = req.user as User;
    return this.communityService.updateComment(postId, id, updateCommentDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId/comments/:id')
  removeComment(@Param('postId', ParseIntPipe) postId: number, @Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as User;
    return this.communityService.removeComment(postId, id, user);
  }
}

```