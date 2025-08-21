```markdown
# 네트워킹2

This repository is for the '네트워킹2' project, managed through Eposo.

## API Endpoints

* `/register`: Registers a new user.  Accepts POST requests with email, password, name, and contact information.
* `/login`: Logs in an existing user. Accepts POST requests with email and password.
* `/applications`: Retrieves application information for the logged-in user. Supports pagination and optional search functionality.  Accepts GET requests.
* `/matching`: Initiates the matching process for the logged-in user. Accepts POST requests.
* `/community`: Creates a new community post. Accepts POST requests with title, content, and optional category/tags.
* `/community/{postId}`: Retrieves a specific community post by ID. Accepts GET requests.
* `/community/{postId}`: Updates a specific community post by ID. Accepts PUT requests with updated title, content, and optional category/tags.
* `/community/{postId}`: Deletes a specific community post by ID. Accepts DELETE requests.
* `/community/list`: Retrieves a list of community posts. Supports pagination and optional filtering by category/tags. Accepts GET requests.
* `/community/{postId}/comments`: Creates a new comment on a specific post. Accepts POST requests with comment content.
* `/community/{postId}/comments/{commentId}`: Updates a specific comment by ID. Accepts PUT requests with updated comment content.
* `/community/{postId}/comments/{commentId}`: Deletes a specific comment by ID. Accepts DELETE requests.


## Application Information Retrieval

This endpoint retrieves application information for the currently logged-in user.  It supports pagination to handle large datasets and offers optional search functionality.

**Endpoint:** `/applications`

**Method:** GET

**Parameters:**

* `page` (optional): Page number for pagination. Defaults to 1.
* `limit` (optional): Number of items per page. Defaults to 10.
* `search` (optional): Search query string.  If provided, the results will be filtered to include applications matching the search term.

**Response:**

Returns a JSON object containing the application information and pagination details.

**Example Usage:**

```
// Get the first page of applications (default 10 items per page)
GET /applications

// Get the second page of applications with 20 items per page
GET /applications?page=2&limit=20

// Search for applications containing the term "example"
GET /applications?search=example
```

## Matching

This endpoint initiates the matching process.  The backend algorithm uses user-provided information such as location, preferences, and interests to create groups of 5 or fewer users.  Matching is performed automatically on a weekly basis, but users can also manually trigger the process using this endpoint.

**Endpoint:** `/matching`

**Method:** POST

**Request:**

No request body is required.

**Response:**

Returns a JSON object indicating the status of the matching request.  This may include information about the matching progress or the estimated completion time.


**Example Usage:**

```
// Initiate the matching process
POST /matching
```

## Community Board

This endpoint allows users to create, read, update, and delete posts and comments within the community forum.  Posts can be categorized using tags and categories for easier browsing and searching.

**Endpoints:**

* `POST /community`: Creates a new post.
* `GET /community/{postId}`: Retrieves a specific post.
* `PUT /community/{postId}`: Updates a specific post.
* `DELETE /community/{postId}`: Deletes a specific post.
* `GET /community/list`: Retrieves a list of posts (supports pagination and filtering).
* `POST /community/{postId}/comments`: Creates a new comment on a post.
* `PUT /community/{postId}/comments/{commentId}`: Updates a specific comment.
* `DELETE /community/{postId}/comments/{commentId}`: Deletes a specific comment.


**Example Usage:**

```
// Create a new post
POST /community
{
  "title": "Example Post Title",
  "content": "This is the content of the post.",
  "category": "general",
  "tags": ["discussion", "help"]
}

// Get a specific post
GET /community/123

// Update an existing post
PUT /community/123
{
  "title": "Updated Post Title",
  "content": "This is the updated content of the post."
}

// Delete a post
DELETE /community/123

// Get a list of posts
GET /community/list?page=1&limit=10&category=general&tags=discussion

// Create a new comment
POST /community/123/comments
{
  "content": "This is a comment on the post."
}

// Update a comment
PUT /community/123/comments/456
{
  "content": "This is the updated comment."
}

// Delete a comment
DELETE /community/123/comments/456
```
```