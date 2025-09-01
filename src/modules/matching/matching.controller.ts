```typescript
@Post('match') // New endpoint /match
  async createMatch(@Body() input: UserMatchingInputDTO): Promise<any> {
    return this.matchingService.startMatching(input);
  }
```