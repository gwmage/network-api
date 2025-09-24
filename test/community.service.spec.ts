import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from '../src/modules/community/community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../src/modules/community/entities/post.entity';
import { Comment } from '../src/modules/community/entities/comment.entity';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository, In } from 'typeorm';
import { CreatePostDto } from '../src/modules/community/dto/create-post.dto';
import { UpdatePostDto } from '../src/modules/community/dto/update-post.dto';
import { CreateCommentDto } from '../src/modules/community/dto/create-comment.dto';
import { UpdateCommentDto } from '../src/modules/community/dto/update-comment.dto';
import { NotificationService } from '../src/modules/notification/notification.service';
import { SearchPostDto } from '../src/modules/community/dto/search-post.dto';

import { NotFoundException } from '@nestjs/common';
import { Category } from '../src/modules/community/entities/category.entity';
import { Tag } from '../src/modules/community/entities/tag.entity';





describe('CommunityService', () => {
  let service: CommunityService;
  let postRepository: Repository<Post>;
  let commentRepository: Repository<Comment>;
  let categoryRepository: Repository<Category>;
  let tagRepository: Repository<Tag>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      providers: [
        CommunityService,
        {
          provide: getRepositoryToken(Post),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Tag),
          useClass: Repository,
        },
        {
          provide: NotificationService,
          useValue: {
            createNotification: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
    categoryRepository = module.get<Repository<Category>>(getRepositoryToken(Category));
    tagRepository = module.get<Repository<Tag>>(getRepositoryToken(Tag));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
        const createPostDto: CreatePostDto = {
            title: 'Test Post',
            content: 'Test Content',
            categories: [],
            tags: [],
          };
          const user = new User(); 
          const createdPost = new Post(); 
          jest.spyOn(postRepository, 'create').mockReturnValue(createdPost);
          jest.spyOn(postRepository, 'save').mockResolvedValue(createdPost);
          const result = await service.createPost(createPostDto, user);
          expect(result).toEqual(createdPost);
          expect(postRepository.create).toHaveBeenCalledWith({ ...createPostDto, author: user });
          expect(postRepository.save).toHaveBeenCalledWith(createdPost);
    });
});


