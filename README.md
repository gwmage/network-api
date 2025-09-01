```markdown
# 네트워킹2

This repository is for the '네트워킹2' project, managed through Eposo.

## API Endpoints

* `/register`: Registers a new user.  Accepts POST requests with email, password, name, and contact information.
* `/login`: Logs in an existing user. Accepts POST requests with email and password.
* `/applications`: Retrieves application information for the logged-in user. Supports pagination and optional search functionality.  Accepts GET requests.
* `/matching`: Initiates the matching process for the logged-in user. Accepts POST requests.
* `/matching/status`: Retrieves the current status of the matching process. Accepts GET requests.
* `/community`: Creates a new community post. Accepts POST requests with title, content, and optional category/tags.
* `/community/{postId}`: Retrieves a specific community post by ID. Accepts GET requests.
* `/community/{postId}`: Updates a specific community post by ID. Accepts PUT requests with updated title, content, and optional category/tags.
* `/community/{postId}`: Deletes a specific community post by ID. Accepts DELETE requests.
* `/community/list`: Retrieves a list of community posts. Supports pagination and optional filtering by category/tags. Accepts GET requests.
* `/community/{postId}/comments`: Creates a new comment on a specific post. Accepts POST requests with comment content.
* `/community/{postId}/comments/{commentId}`: Updates a specific comment by ID. Accepts PUT requests with updated comment content.
* `/community/{postId}/comments/{commentId}`: Deletes a specific comment by ID. Accepts DELETE requests.


## Application Information Retrieval

(Content omitted for brevity - same as before)

## Matching

This endpoint initiates the matching process.  The backend algorithm uses user-provided information such as location, preferences, and interests to create groups of 5 or fewer users.  Matching is performed automatically on a weekly basis (every Sunday at midnight - configurable in the `schedule.config.ts` file). Users can also manually trigger the process using this endpoint.  Use the `/matching/status` endpoint to check the current status of the matching process.


**Endpoints:**

* `/matching`: Triggers the matching process manually.
* `/matching/status`: Retrieves the status of the matching process.


**Manual Matching Request (/matching):**

**Method:** POST

**Request:**

No request body is required.

**Response:**

Returns a JSON object indicating the status of the matching request. This may include information about the matching progress or the estimated completion time.

**Example Usage:**

```
POST /matching
```

**Matching Status Request (/matching/status):**

**Method:** GET

**Request:**

No request body is required.

**Response:**

Returns a JSON object indicating the current status of the matching process.

**Example Usage:**

```
GET /matching/status
```


## Configuring the Scheduled Matching Task

The automated weekly matching task is managed by the `ScheduleService` and uses the NestJS scheduler. The schedule is defined in the `schedule.config.ts` file.

**Cron Expression:**

The cron expression determines when the task runs. The default expression `0 0 * * 0` runs the task every Sunday at midnight (00:00).  You can modify this expression to adjust the schedule as needed.  See [crontab.guru](https://crontab.guru/) for help generating cron expressions.


**Example `schedule.config.ts`:**

```typescript
import { Cron } from '@nestjs/schedule';
// ... other imports

@Cron('0 0 * * 0') // Every Sunday at midnight
async handleCron() {
  // ... matching logic
}

```


## Community Board

(Content omitted for brevity - same as before)
```