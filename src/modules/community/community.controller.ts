```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('posts')
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.communityService.createPost(createPostDto);
  }

  @Get('posts')
  findAllPosts(@Query('page') page: number, @Query('limit') limit: number) {
    return this.communityService.findAllPosts(page, limit);
  }

  @Get('posts/:id')
  findOnePost(@Param('id') id: string) {
    return this.communityService.findOnePost(+id);
  }

  @Put('posts/:id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.communityService.updatePost(+id, updatePostDto);
  }

  @Delete('posts/:id')
  removePost(@Param('id') id: string) {
    return this.communityService.removePost(+id);
  }

  @Post('posts/:postId/comments')
  createComment(@Param('postId') postId: string, @Body() createCommentDto: CreateCommentDto) {
    return this.communityService.createComment(+postId, createCommentDto);
  }


  @Get('posts/:postId/comments')
  findAllComments(@Param('postId') postId: string) {
    return this.communityService.findAllComments(+postId);
  }

  @Get('posts/:postId/comments/:id')
  findOneComment(@Param('postId') postId: string, @Param('id') id: string) {
    return this.communityService.findOneComment(+postId, +id);
  }

  @Put('posts/:postId/comments/:id')
  updateComment(
    @Param('postId') postId: string,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.communityService.updateComment(+postId, +id, updateCommentDto);
  }

  @Delete('posts/:postId/comments/:id')
  removeComment(@Param('postId') postId: string, @Param('id') id: string) {
    return this.communityService.removeComment(+postId, +id);
  }
}

```