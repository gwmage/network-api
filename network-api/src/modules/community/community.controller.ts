```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, ParseIntPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';


@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // Posts
  // ... (Existing Post methods remain unchanged)

  // Comments
  @Post('posts/:postId/comments')
  createComment(@Param('postId', ParseIntPipe) postId: number, @Body() createCommentDto: CreateCommentDto) {
    return this.communityService.createComment(postId, createCommentDto);
  }

  @Get('posts/:postId/comments')
  findAllComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.communityService.findAllComments(postId);
  }

  @Get('posts/:postId/comments/:id')
  async findOneComment(@Param('postId', ParseIntPipe) postId: number, @Param('id', ParseIntPipe) id: number) {
    const comment = await this.communityService.findOneComment(postId, id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }
    return comment;
  }

  @Patch('posts/:postId/comments/:id')
  async updateComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const updatedComment = await this.communityService.updateComment(postId, id, updateCommentDto);
    if (!updatedComment) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }
    return updatedComment;
  }


  @Delete('posts/:postId/comments/:id')
  async removeComment(@Param('postId', ParseIntPipe) postId: number, @Param('id', ParseIntPipe) id: number) {
    const result = await this.communityService.removeComment(postId, id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }
    return { message: 'Comment deleted successfully.' };
  }
}
```