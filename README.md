# Unified Security Application

This project demonstrates a unified security model using JWT, OAuth, and Role-Based Access Control (RBAC) in a full-stack application built with Node.js and React.

## Project Structure

```
unified-security-app
├── backend
│   ├── src
│   │   ├── app.js
│   │   ├── controllers
│   │   │   └── authController.js
│   │   ├── middleware
│   │   │   ├── jwtMiddleware.js
│   │   │   ├── oauthMiddleware.js
│   │   │   └── rbacMiddleware.js
│   │   ├── models
│   │   │   └── user.js
│   │   ├── routes
│   │   │   └── authRoutes.js
│   │   └── utils
│   │       └── tokenUtils.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── App.jsx
│   │   ├── components
│   │   │   └── AuthForm.jsx
│   │   ├── pages
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── hooks
│   │   │   └── useAuth.js
│   │   └── utils
│   │       └── authUtils.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Features

- **JWT Authentication**: Secure user authentication using JSON Web Tokens.
- **OAuth Integration**: Support for third-party authentication providers.
- **RBAC**: Role-Based Access Control to manage user permissions.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React application:
   ```
   npm start
   ```

## Usage

- Access the application in your browser at `http://localhost:3000`.
- Use the login form to authenticate users.
- Explore the dashboard after successful login.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.