```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, ParseIntPipe, NotFoundException, BadRequestException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FindPostQueryDto } from './dto/find-post-query.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    try {
      return await this.communityService.createPost(createPostDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      } else if (error instanceof ForbiddenException) {
        throw new ForbiddenException(error.message);
      } else {
        throw error; // Re-throw other errors
      }
    }
  }

  @Get('/list')
  async findAllPosts(@Query() paginationQuery: PaginationQueryDto) {
    return this.communityService.findAllPosts(paginationQuery);
  }

  @Get(':id')
  async findOnePost(@Param('id', ParseIntPipe) id: number) {
    const post = await this.communityService.findOnePost(id);
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return post;
  }

  @Put(':id')
  async updatePost(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    const updatedPost = await this.communityService.updatePost(id, updatePostDto);
    if (!updatedPost) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return updatedPost;
  }

  @Delete(':id')
  async removePost(@Param('id', ParseIntPipe) id: number) {
    const result = await this.communityService.removePost(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return { message: `Post #${id} deleted successfully` };
  }

  @Post(':postId/comments')
  async createComment(@Param('postId', ParseIntPipe) postId: number, @Body() createCommentDto: CreateCommentDto) {
    return this.communityService.createComment(postId, createCommentDto);
  }

  @Get(':postId/comments')
  async getComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.communityService.findAllComments(postId);
  }

  @Patch(':postId/comments/:id')
  async updateComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.communityService.updateComment(postId, id, updateCommentDto);
  }

  @Delete(':postId/comments/:id')
  async deleteComment(@Param('postId', ParseIntPipe) postId: number, @Param('id', ParseIntPipe) id: number) {
    return this.communityService.removeComment(postId, id);
  }
}

```