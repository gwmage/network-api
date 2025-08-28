```typescript
@Post('matching')
  async initiateMatching(@Body(new ValidationPipe()) userInput: UserMatchingInputDTO): Promise<MatchingResultsDto> {
    try {
      const matchingResult = await this.matchingService.initiateMatching(userInput);
      return matchingResult;
    } catch (error) {
      console.error('Error initiating matching:', error);
      throw error; // Re-throw the error to be handled by the global exception filter
    }
  }
```