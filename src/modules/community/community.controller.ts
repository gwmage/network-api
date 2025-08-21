```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, ParseIntPipe } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FindPostQueryDto } from './dto/find-post-query.dto';


@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.communityService.createPost(createPostDto);
  }

  @Get('/list')
  findAllPosts(@Query() query: FindPostQueryDto) {
    return this.communityService.findAllPosts(query);
  }

  @Get(':id')
  findOnePost(@Param('id', ParseIntPipe) id: number) {
    return this.communityService.findOnePost(id);
  }

  @Put(':id')
  updatePost(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.communityService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  removePost(@Param('id', ParseIntPipe) id: number) {
    return this.communityService.removePost(id);
  }

  @Post(':postId/comments')
  createComment(@Param('postId', ParseIntPipe) postId: number, @Body() createCommentDto: CreateCommentDto) {
    return this.communityService.createComment(postId, createCommentDto);
  }

  @Get(':postId/comments')
  findAllComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.communityService.findAllComments(postId);
  }

  @Get(':postId/comments/:id')
  findOneComment(@Param('postId', ParseIntPipe) postId: number, @Param('id', ParseIntPipe) id: number) {
    return this.communityService.findOneComment(postId, id);
  }

  @Put(':postId/comments/:id')
  updateComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.communityService.updateComment(postId, id, updateCommentDto);
  }

  @Delete(':postId/comments/:id')
  removeComment(@Param('postId', ParseIntPipe) postId: number, @Param('id', ParseIntPipe) id: number) {
    return this.communityService.removeComment(postId, id);
  }
}

```