## Network API

... (existing documentation)


### Matching Algorithm

The matching algorithm runs weekly to group users based on their shared region, preferences, and interests.  It utilizes weighted factors to prioritize certain criteria. The matching results are then persisted to the database.

#### Running the Scheduled Job

The matching algorithm is scheduled to run weekly using the `@nestjs/schedule` library.  The cron expression is defined in  `network-api/config/schedule.config.ts`.  By default, it runs every Sunday at midnight.  To change the schedule, modify the `cronTime` property in the `scheduleConfig` array.

To run the application with the scheduler enabled, use the following command:

```bash
npm run start:dev  // or npm run start:prod for production
```

The scheduler will automatically start and execute the `runMatching` function in the `MatchingService` according to the specified cron expression.



... (rest of documentation)



---[END_OF_FILES]---