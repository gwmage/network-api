"## Matching Module

This module implements the AI-based matching algorithm for the network API.

### API Endpoints

* **POST /matching:** Accepts user data (region, preferences, interests) and returns a list of matched user groups.
* **GET /matching/groups:** Returns the currently matched user groups.
* **GET /matching/progress:** Returns the matching progress data and explanations.

### Data Models

* **UserMatchingInputDto:** DTO for user input (region, preferences, interests).
* **MatchingGroupDto:** DTO for matched user groups (max 5 users per group).
* **MatchingGroup:** Entity for storing matched group data.
* **MatchExplanation:** Entity for storing matching progress and explanation data. 

### Algorithm Implementation

The matching algorithm uses a weighted approach to calculate the compatibility score between users. The following parameters are considered:

* **Region:** [Weight: X]
* **Preferences:** [Weight: Y]
* **Interests:** [Weight: Z]

[Explain the detailed matching logic and weighting scheme here.  Be specific about how scores are calculated and groups are formed.]

### Scheduling

The matching algorithm is scheduled to run automatically once a week (every Sunday at 00:00) using a cron job."