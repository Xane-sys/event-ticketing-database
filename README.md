Event Management and Ticketing API

 1. Project Description

The Event Management and Ticketing API is a REST API built with
Node.js, Express.js, and MongoDB.

It allows users to register, log in, create events, view events,
and reserve tickets.

The API uses JWT authentication to verify users and role-based
authorization to control access to protected endpoints.

2. Technology Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Postman

 3. Installation and Setup

 Step 1: Clone the project

Clone the repository or open the project folder in VS Code.

 Step 2: Install dependencies

Run the following command in the terminal:

npm install

 Step 3: Configure environment variables

Create a .env file in the root directory.

Example:

PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Replace the example values with your actual configuration.

Never share your real JWT secret or database credentials.

 Step 4: Start the server

Run:

npm run dev

If your project does not have a dev script, use:

node server.js

 Step 5: Access the API

Base URL:

http://localhost:8080

Make sure the server is running on port 8080.
If you use another port, update the URL accordingly.

 4. Authentication

The API uses JSON Web Tokens (JWT) for authentication.

Users must register and log in to obtain a token.

Protected endpoints require the token in the Authorization header.

Example:

Authorization: Bearer YOUR_JWT_TOKEN

 Authentication Endpoints

 Register User

- Method: POST
- Endpoint: /api/auth/register
- Access: Public

Description:

Registers a new user.

Example request:

    {
      "name": "Alex",
      "email": "alex@gmail.com",
      "password": "SecurePass123"
    }

 Login User

- Method: POST
- Endpoint: /api/auth/login
- Access: Public

Description:

Authenticates a registered user and returns a token.

Example request:

    {
      "email": "alex@gmail.com",
      "password": "SecurePass123"
    }
 5. Event Endpoints

Get All Events

- Method: GET
- Endpoint: /api/events
- Access: Public, if configured that way

Description:

Returns a list of events.

 Get a Single Event

- Method: GET
- Endpoint: /api/events/:id
- Access: Depends on route configuration

Description:

Returns details for a specific event.

 Create an Event

- Method: POST
- Endpoint: /api/events
- Access: Organizer or Admin

Description:

Creates a new event.

Example request:

    {
      "title": "Abuja Tech Conference",
      "description": "A conference for developers and technology enthusiasts.",
      "location": "Abuja, Nigeria",
      "date": "2026-12-15T10:00:00.000Z",
      "price": 5000,
      "totalTickets": 200
    }

Authentication:

A valid JWT is required, and the user must have an authorized role.

6. Ticket Orders

 Reserve Tickets

- Method: POST
- Endpoint: /api/orders
- Access: Authenticated users

Description:

Creates a ticket reservation for an event.

Example request:

    {
      "eventId": "YOUR_EVENT_ID",
      "quantity": 2
    }

Replace YOUR_EVENT_ID with the actual ID of an event in MongoDB.

The API should check ticket availability before creating a reservation.

A pending reservation does not mean payment has been completed.

7. HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | Request successful |
| 201 | Resource created successfully |
| 400 | Invalid request |
| 401 | Authentication required or invalid |
| 403 | Permission denied |
| 404 | Resource not found |
| 500 | Internal server error |

Actual status codes depend on how the API handles each request.

8. Testing

Use Postman to test the API endpoints.

1. Register a user.
2. Log in to obtain a JWT.
3. Copy the token.
4. Add the token under Authorization > Bearer Token.
5. Create an event using an authorized account.
6. Submit a ticket reservation request.
7. Verify the responses.

9. Project Structure

- config: Application configuration and database connection.
- controllers: Request handling and business logic.
- middleware: Authentication and authorization.
- models: MongoDB data models.
- routes: API endpoint definitions.
- server.js: Starts the Express server.
- README.md: Project documentation.

10. Future Improvements

- Payment gateway integration.
- Email confirmations.
- Digital ticket generation.
- Ticket cancellation and refunds.
- Event search and filtering.
- Automated testing.