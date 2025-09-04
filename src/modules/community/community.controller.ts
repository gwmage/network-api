```typescript
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/entities/user.entity';



@Controller('community')
@UseGuards(AuthGuard()) // Use AuthGuard for all routes in this controller
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // ... existing Post methods

  @Post('posts/:postId/comments')
  createComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User
  ) {

    return this.communityService.createComment(postId, createCommentDto, user);
  }

  @Get('posts/:postId/comments')
  findAllComments(
    @Param('postId', ParseIntPipe) postId: number,
    @Query('parentCommentId', ParseIntPipe) parentCommentId?: number
  ) {
    return this.communityService.findAllCommentsByPost(postId, parentCommentId);
  }


  @Get('posts/:postId/comments/:id')
  async findOneComment(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.communityService.findOneComment(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }
    return comment;
  }

  @Patch('posts/:postId/comments/:id')
  async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const updatedComment = await this.communityService.updateComment(id, updateCommentDto);
    if (!updatedComment) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }
    return updatedComment;
  }

  @Delete('posts/:postId/comments/:id')
  async removeComment(@Param('id', ParseIntPipe) id: number) {
    await this.communityService.removeComment(id); // No need to check affected rows, just delete
    return { message: 'Comment deleted successfully.' };
  }


}

```