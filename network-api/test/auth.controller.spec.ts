// Implement tests here (this is a placeholder as test implementation is outside the scope of this example)

---[@document]---
```
POST /auth/register

Registers a new user.

Request Body:
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!",
  "name": "User Name",
  "phoneNumber": "+15551234567",
  "address": "123 Main St",
  "city": "Anytown",
  "state": "CA",
  "zipCode": "90210"
}
```

Validation Rules:
- Email: Must be a valid email address and unique in the database.
- Password: Must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
- Name: Must contain only letters and spaces.
- Phone Number: Must be a valid phone number format.
- Address, City, State, Zip Code: Required fields.
- Zip Code: Must be a valid US zip code format (5 digits or 5 digits followed by a hyphen and 4 digits).


Response:
- 201 Created: Registration successful. Returns a JSON object with a success message.
```json
{
  "message": "Registration successful"
}
```
- 400 Bad Request: Validation error. Returns a JSON object with detailed error messages.
- 409 Conflict: Email already exists.
- 500 Internal Server Error: Database error or other server-side error.

```
```

---[END_OF_FILES]---