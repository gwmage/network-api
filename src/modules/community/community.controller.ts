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
  DefaultValuePipe,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { Post as PostEntity } from './entities/post.entity';
import { SearchPostDto } from './dto/search-post.dto';


@Controller('community')
@UseGuards(AuthGuard())
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('posts')
  createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User): Promise<PostEntity> {
    return this.communityService.createPost(createPostDto, user);
  }

  @Get('posts')
  async findAllPosts(
    @Query() searchPostDto: SearchPostDto
  ): Promise<{ posts: PostEntity[]; totalCount: number }> {
    return this.communityService.findAllPosts(searchPostDto);
  }


  @Get('posts/:id')
  async findOnePost(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.communityService.findOnePost(id);
  }


  @Patch('posts/:id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.communityService.updatePost(id, updatePostDto, user);
  }

  @Delete('posts/:id')
  removePost(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    return this.communityService.removePost(id, user);
  }



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
    @Query('parentCommentId', ParseIntPipe, {optional: true}) parentCommentId?: number
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
    await this.communityService.removeComment(id);
    return { message: 'Comment deleted successfully.' };
  }


}

```