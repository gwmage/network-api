```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, ParseIntPipe } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { SearchPostDto } from './dto/search-post.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // ... (Existing Post related endpoints)

  @Get('posts/search')
  searchPosts(@Query() searchPostDto: SearchPostDto) {
    return this.communityService.searchPosts(searchPostDto);
  }


  @Post('posts/:postId/comments')
  createComment(@Param('postId', ParseIntPipe) postId: number, @Body() createCommentDto: CreateCommentDto) {
    return this.communityService.createComment(postId, createCommentDto);
  }

  @Get('posts/:postId/comments')
  findAllComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.communityService.findAllComments(postId);
  }

  @Get('posts/:postId/comments/:id')
  findOneComment(@Param('postId', ParseIntPipe) postId: number, @Param('id', ParseIntPipe) id: number) {
    return this.communityService.findOneComment(postId, id);
  }

  @Put('posts/:postId/comments/:id')
  updateComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.communityService.updateComment(postId, id, updateCommentDto);
  }

  @Delete('posts/:postId/comments/:id')
  removeComment(@Param('postId', ParseIntPipe) postId: number, @Param('id', ParseIntPipe) id: number) {
    return this.communityService.removeComment(postId, id);
  }
}

```