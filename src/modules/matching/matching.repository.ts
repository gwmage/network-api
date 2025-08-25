```typescript
async findMatchingGroups(where: FindOptionsWhere<MatchingGroup>): Promise<MatchingGroup[]> {
    return this.matchingGroupRepository.find({ where });
  }

  async findUserMatches(where: FindOptionsWhere<UserMatch>): Promise<UserMatch[]> {
    return this.userMatchRepository.find({ where });
  }
```
