## Matching Module

This module implements the AI-based matching algorithm for the network API.

### API Endpoints

* **POST /matching/generate:** Accepts user data (region, preferences, interests, or user IDs) and returns a list of matched user groups.
* **GET /matching/results:** Returns the currently matched user groups.  Optionally filter by `userId` query parameter.

### Data Models

* **UserMatchingInputDto:** DTO for user input (region, preferences, interests, or user IDs).
* **MatchingGroupDto:** DTO for matched user groups (max 5 users per group).
* **MatchingGroup:** Entity for storing matched group data.
* **MatchExplanation:** Entity for storing matching progress and explanation data (not currently used). 

### Algorithm Implementation

The matching algorithm currently uses a simple grouping mechanism, dividing users into groups of approximately 5.  This will be replaced with a more sophisticated weighted approach in the future.

The following parameters will be considered:

* **Region:** [Weight: TBD]
* **Preferences:** [Weight: TBD]
* **Interests:** [Weight: TBD]

The detailed matching logic and weighting scheme will be defined soon.  This will include how scores are calculated and groups are formed based on user compatibility.


### Scheduling

The matching algorithm is scheduled to run automatically once a week (every Sunday at 00:00) using a cron job.  This is implemented in the `ScheduleService` and calls the `runMatching` function in the `MatchingService`.