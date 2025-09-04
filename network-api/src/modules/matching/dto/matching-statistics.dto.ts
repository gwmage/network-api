```typescript
export class MatchingStatisticsDto {
  totalGroups: number;
  averageGroupSize: number;
}
```
---[@document]---
```
## Matching API Endpoints

This document describes the new API endpoints for managing matching functionality.

### 1. Retrieve Matching Results

**Endpoint:** `GET /matching/results`

**Query Parameters:**

- `userId` (optional): If provided, only returns groups containing this user.

**Response:**

```json
{
  "groups": [
    {
      "groupId": "uuid",
      "users": [
        // User objects
      ]
    }
  ],
  "notificationId": "uuid" // Optional notification ID
}
```

### 2. Update Match

**Endpoint:** `PUT /matching/results/:matchId`

**Path Parameters:**

- `matchId`: The ID of the match to update.

**Request Body:**

```json
{
  // Partial MatchingGroupDto -  only properties to be updated
}
```

**Response:**

```json
{
      "groupId": "uuid",
      "users": [
        // User objects
      ]
}
```


### 3. Configure Matching Criteria

**Endpoint:** `PUT /matching/criteria`

**Request Body:**

```json
{
  "region": "string",
  "preferences": ["string"],
  "interests": ["string"],
  "groupSize": number
}
```

**Response:** 200 OK


### 4. Retrieve Matching Statistics (Optional)

**Endpoint:** `GET /matching/statistics`

**Response:**

```json
{
  "totalGroups": number,
  "averageGroupSize": number
}
```

**Error Codes:**

- 400 Bad Request: Invalid input data.
- 404 Not Found: Match not found.
- 500 Internal Server Error: Server error.


```
---[END_OF_FILES]---