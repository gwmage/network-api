```typescript
@Get('results') // New endpoint for retrieving matching results
  async getMatchingResults(): Promise<MatchResultDto> {
    try {
      const matchingResult = await this.matchingService.getMatchingResults(); // Implement this method in the service
      return matchingResult;
    } catch (error) {
        throw new HttpException('Failed to retrieve matching results', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
```