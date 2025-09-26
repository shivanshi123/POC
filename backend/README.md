# Unified Security Application - Backend

This is the backend part of the Unified Security Application, which demonstrates a unified security model using JWT, OAuth, and Role-Based Access Control (RBAC).

## Features

- **JWT Authentication**: Secure user authentication using JSON Web Tokens.
- **OAuth Integration**: Support for third-party authentication providers.
- **RBAC**: Role-based access control to manage user permissions.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (or any other database of your choice)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd unified-security-app/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the server:
   ```
   npm start
   ```

2. The server will run on `http://localhost:5000` by default.

### API Endpoints

- **POST /api/auth/login**: Authenticate user and return a JWT.
- **POST /api/auth/register**: Register a new user.
- **GET /api/protected**: Access a protected route (requires JWT).

### Middleware

- **JWT Middleware**: Verifies JWT tokens for protected routes.
- **OAuth Middleware**: Handles OAuth authentication.
- **RBAC Middleware**: Checks user roles and permissions.

### Models

- **User Model**: Defines the user schema and methods for database interaction.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the LICENSE file for details.