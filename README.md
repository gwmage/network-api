```markdown
# 네트워킹2

This repository is for the '네트워킹2' project, managed through Eposo.

## API Endpoints

* `/register`: Registers a new user.  Accepts POST requests with email, password, name, and contact information.
* `/login`: Logs in an existing user. Accepts POST requests with email and password.
* `/applications`: Retrieves application information for the logged-in user. Supports pagination and optional search functionality.  Accepts GET requests.
* `/matching`: Initiates the matching process for the logged-in user. Accepts POST requests.


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
```