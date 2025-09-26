# Unified Security Application - Frontend

This project is a React application that demonstrates a unified security model using JWT, OAuth, and Role-Based Access Control (RBAC). It is designed to work in conjunction with a Node.js backend.

## Features

- User authentication using JWT and OAuth
- Role-Based Access Control (RBAC) for managing user permissions
- Responsive design for a seamless user experience

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   git clone <repository-url>

2. Navigate to the frontend directory:

   cd unified-security-app/frontend

3. Install the dependencies:

   npm install

### Running the Application

To start the development server, run:

npm start

The application will be available at `http://localhost:3000`.

### Folder Structure

- `src/`: Contains the source code for the React application.
  - `components/`: Reusable components for the application.
  - `pages/`: Page components for different routes.
  - `hooks/`: Custom hooks for managing state and side effects.
  - `utils/`: Utility functions for authentication and other tasks.

### Usage

- Navigate to the Login page to authenticate users.
- After successful login, users will be redirected to the Dashboard page, where they can access user-specific content based on their roles.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.