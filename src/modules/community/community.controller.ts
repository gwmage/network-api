```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, ParseIntPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // Posts
  @Post('posts')
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.communityService.createPost(createPostDto);
  }

  @Get('posts')
  async findAllPosts(
    @Query('page', ParseIntPipe) page: number = 1, 
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('category') category?: string,
    @Query('tags') tags?: string[],
  ) {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Invalid page or limit parameters.');
    }
    return this.communityService.findAllPosts(page, limit, category, tags);
  }

  @Get('posts/:id')
  async findOnePost(@Param('id', ParseIntPipe) id: number) {
    const post = await this.communityService.findOnePost(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }
    return post;
  }

  @Put('posts/:id')
  async updatePost(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    const updatedPost = await this.communityService.updatePost(id, updatePostDto);
    if (!updatedPost) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }
    return updatedPost;
  }

  @Delete('posts/:id')
  async removePost(@Param('id', ParseIntPipe) id: number) {
    const result = await this.communityService.removePost(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }
    return { message: 'Post deleted successfully.' };
  }

  // ... (rest of the code remains the same)
}
```