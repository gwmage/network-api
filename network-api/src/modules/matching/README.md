## Matching Module

This module implements the AI-based matching algorithm for the network API.

### API Endpoints

* **POST /matching/generate:** Accepts user data (region, preferences, interests, or user IDs) and returns a list of matched user groups.
* **GET /matching/results:** Returns the currently matched user groups.  Optionally filter by `userId` query parameter.
* **POST /matching/find:** Accepts an array of `UserDataDto` objects and returns matched groups based on the provided user data.
* **PUT /matching/weights:** Accepts a `MatchingWeightsDto` object to adjust the weighting parameters for the matching algorithm.

### Data Models

* **UserDataDto:** DTO for user input (region, preferences, interests).
* **MatchingGroupDto:** DTO for matched user groups (max 5 users per group) including a `groupId`.
* **MatchingWeightsDto:** DTO for adjusting weighting parameters (location, preferences, interests).
* **MatchingGroup:** Entity for storing matched group data, including `groupId`.
* **MatchExplanation:** Entity for storing matching progress and explanation data (not currently used). 

### Algorithm Implementation

The matching algorithm currently uses a simple grouping mechanism, dividing users into groups of approximately 5.  This will be replaced with a more sophisticated weighted approach in the future.  Weights for region, preferences, and interests can be adjusted using the `/matching/weights` endpoint.

### Scheduling

The matching algorithm is scheduled to run automatically once a week (every Sunday at 00:00) using a cron job.  This is implemented in the `ScheduleService` and calls the `runMatching` function in the `MatchingService`.

---[END_OF_FILES]---