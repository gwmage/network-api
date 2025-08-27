```typescript
@Post('match')
async executeMatching(@Body() userInput: UserMatchingInputDTO): Promise<MatchResultDto[]> {
  return this.matchingService.executeMatchingAlgorithm(userInput);
}
```