```markdown
# 네트워킹2

This repository is for the '네트워킹2' project, managed through Eposo.

## API Endpoints

* `/register`: Registers a new user.  Accepts POST requests with email, password, name, and contact information.
* `/login`: Logs in an existing user. Accepts POST requests with email and password.
* `/applications`: Retrieves application information for the logged-in user. Supports pagination and optional search functionality.  Accepts GET requests.
* `/matching`: Initiates the matching process for the logged-in user. Accepts POST requests.  Returns a JSON object with matching status and information.
* `/matching/status`: Retrieves the current status of the matching process. Accepts GET requests. Returns a JSON object indicating the current stage and estimated completion time.
* `/community`: Creates a new community post. Accepts POST requests with title, content, and optional category/tags.
* `/community/{postId}`: Retrieves a specific community post by ID. Accepts GET requests.
* `/community/{postId}`: Updates a specific community post by ID. Accepts PUT requests with updated title, content, and optional category/tags.
* `/community/{postId}`: Deletes a specific community post by ID. Accepts DELETE requests.
* `/community/list`: Retrieves a list of community posts. Supports pagination and optional filtering by category/tags. Accepts GET requests.
* `/community/{postId}/comments`: Creates a new comment on a specific post. Accepts POST requests with comment content.
* `/community/{postId}/comments/{commentId}`: Updates a specific comment by ID. Accepts PUT requests with updated comment content.
* `/community/{postId}/comments/{commentId}`: Deletes a specific comment by ID. Accepts DELETE requests.


## Application Information Retrieval

(Content remains unchanged)

## Matching

This endpoint initiates the matching process. The backend algorithm uses user-provided information such as location, preferences, and interests to create groups of 5 or fewer users. Matching is performed automatically on a weekly basis, but users can also manually trigger the process using the `/matching` endpoint.  The AI-powered matching algorithm considers various factors and assigns weights to them to optimize group formation.

**Endpoints:**

* `/matching`: Initiates the matching process. Accepts POST requests.
* `/matching/status`: Retrieves the current status of the matching process.  Accepts GET requests.


**Matching Request (/matching):**

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

**Response:**
Returns a JSON object indicating the current matching stage (e.g., "not started," "in progress," "completed") and estimated completion time if applicable.


**Example Usage:**

```
GET /matching/status
```

## Community Board

(Content remains unchanged)
```
