```typescript
describe('getComments', () => {
    it('should return an array of comments with pagination', async () => {
      const postId = 1;
      const pageOptionsDto: PageOptionsDto = {
        page: 1,
        take: 10,
      };
      const comments: Comment[] = [
        { id: 1, content: 'Comment 1' } as Comment,
        { id: 2, content: 'Comment 2' } as Comment,
      ];
      const pageMetaDto: PageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount: comments.length });
      const pageDto: PageDto<Comment> = new PageDto(comments, pageMetaDto);

      jest.spyOn(commentRepository, 'findAndCount').mockResolvedValue([[comments, comments.length]]);



      const result = await service.getComments(postId, pageOptionsDto);


      expect(result).toEqual(pageDto);
      expect(commentRepository.findAndCount).toHaveBeenCalledWith({
        where: { post: { id: postId } },
        take: pageOptionsDto.take,
        skip: pageOptionsDto.skip,
      });
    });

    
  });
```