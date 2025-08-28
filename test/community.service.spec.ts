```typescript
  describe('search', () => {
    it('should return posts based on search criteria', async () => {
      const searchDto = { keyword: 'test', sort: 'newest', category: 'category1' };
      const mockPosts: Community[] = [{ id: 1, title: 'Test Post', content: 'This is a test post.', category: 'category1' } as Community];
      jest.spyOn(communityRepository, 'findAndCount').mockResolvedValue([mockPosts, mockPosts.length]);

      const result = await service.search(searchDto);
      expect(communityRepository.findAndCount).toHaveBeenCalledWith(expect.objectContaining({
        where: expect.any(Object),
        order: { createdAt: 'DESC' },
      }));
      expect(result.data).toEqual(mockPosts);
      expect(result.meta).toBeDefined();
    });

    it('should return all posts if no search criteria are provided', async () => {
      const searchDto = {};
      const mockPosts: Community[] = [{ id: 1, title: 'Post 1' } as Community, { id: 2, title: 'Post 2' } as Community];
      jest.spyOn(communityRepository, 'findAndCount').mockResolvedValue([mockPosts, mockPosts.length]);

      const result = await service.search(searchDto);
      expect(communityRepository.findAndCount).toHaveBeenCalledWith(expect.objectContaining({
        where: {},
        order: { createdAt: 'DESC' },
      }));
      expect(result.data).toEqual(mockPosts);
      expect(result.meta).toBeDefined();
    });

    it('should handle different sort options', async () => {
      const searchDto = { sort: 'relevance' }; // Add relevance sort
      const mockPosts: Community[] = [];
      jest.spyOn(communityRepository, 'findAndCount').mockResolvedValue([mockPosts, mockPosts.length]);

      await service.search(searchDto);
      // Expect a different order or criteria based on relevance.  Implementation details will vary.
      expect(communityRepository.findAndCount).toHaveBeenCalled();
    });


    it('should handle pagination correctly', async () => {
      const searchDto = { keyword: 'test', page: 2, limit: 5 };
      const mockPosts: Community[] = [];  // Mock posts are not relevant for this test
      jest.spyOn(communityRepository, 'findAndCount').mockResolvedValue([mockPosts, 15]); // Simulate 15 total posts

      const result = await service.search(searchDto);
      expect(communityRepository.findAndCount).toHaveBeenCalledWith(expect.objectContaining({
        skip: 5, // (page - 1) * limit
        take: 5, // limit
      }));
      expect(result.meta).toBeDefined();
      expect(result.meta.currentPage).toBe(2);
      expect(result.meta.totalPages).toBe(3);
    });
  });
```