```typescript
import { CronExpression } from '@nestjs/schedule';

export const scheduleConfig = [
    {
        cronTime: CronExpression.EVERY_SUNDAY_AT_MIDNIGHT,
        task: 'matching',
        options: {
            priority: 1, // Adjust priority if needed
        },
    },
    // Other scheduled tasks can be added here
];
```