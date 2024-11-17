
# Project Name: Assignment Management System

## Description

The **Assignment Management System** is a backend application built with Node.js, Express, and MongoDB, designed for managing tasks assigned to users and their approval process by admins. This system allows users to upload assignments and track their approval status, while administrators can view and approve/reject assignments.

## Features

- **User Registration**: Users can register with details like name, email, and role.
- **Admin Registration**: Admins can register and manage assignments.
- **Assignment Creation**: Users can upload assignments, and assign them to specific admins for approval.
- **Assignment Approval**: Admins can approve or reject assignments.
- **JWT Authentication**: Users and admins must authenticate via JWT to interact with protected routes.
- **Task Status**: Track the status of each task (Pending, Accepted, Rejected).
- **Error Handling**: Centralized error handling to catch and manage errors.

## Technologies Used

- **Node.js**: JavaScript runtime to build server-side applications.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database to store user, assignment, and admin data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **dotenv**: Environment variable configuration for sensitive data.
- **body-parser**: Middleware to parse incoming request bodies.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.

## Installation

Follow the steps below to get your environment set up and run the project:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/assignment-management-system.git
```

### 2. Navigate to the Project Directory
```bash
cd assignment-management-system
```

### 3. Install Dependencies
Make sure you have **Node.js** installed. Then, install the required dependencies by running:

```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory and add the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/assignment_management
SECRET_KEY=your_secret_key
JWT_EXPIRES_IN=1h
```

- **MONGODB_URI**: The MongoDB connection string (local or remote).
- **SECRET_KEY**: A secret key used for JWT authentication.
- **JWT_EXPIRES_IN**: Expiry time for JWT tokens (e.g., `1h`, `2h`, `7d`).

### 5. Start the Application
Once the dependencies are installed and the environment variables are configured, you can start the server:

```bash
npm start
```

The application should now be running on **http://localhost:5000** (or the port you specify in `.env`).

## API Endpoints

### 1. **User Registration**
- **Route**: `POST /api/users/register`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }
  ```
- **Response**: 
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
  ```

### 2. **Admin Registration**
- **Route**: `POST /api/admins/register`
- **Description**: Register a new admin.
- **Request Body**:
  ```json
  {
    "name": "Admin Name",
    "email": "admin@example.com",
    "password": "adminPassword123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Admin registered successfully",
    "admin": {
      "name": "Admin Name",
      "email": "admin@example.com"
    }
  }
  ```

### 3. **User Login (JWT Authentication)**
- **Route**: `POST /api/users/login`
- **Description**: User login to generate a JWT token.
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "your_jwt_token_here"
  }
  ```

### 4. **Admin Login (JWT Authentication)**
- **Route**: `POST /api/admins/login`
- **Description**: Admin login to generate a JWT token.
- **Request Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "adminPassword123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "your_jwt_token_here"
  }
  ```

### 5. **Upload Assignment (Protected Route)**
- **Route**: `POST /api/users/upload`
- **Description**: Upload an assignment and assign it to an admin for approval. Requires authentication via JWT token.
- **Request Body**:
  ```json
  {
    "task": "Complete React.js Task",
    "adminId": "adminId123"
  }
  ```
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Assignment uploaded successfully",
    "assignment": {
      "task": "Complete React.js Task",
      "status": "pending",
      "createdAt": "2024-11-17T12:34:56Z"
    }
  }
  ```

### 6. **Fetch Assignments by Admin (Protected Route)**
- **Route**: `GET /api/admins/assignments`
- **Description**: Fetch all assignments assigned to a specific admin. Requires authentication via JWT token.
- **Query Parameter**:
  - `adminName`: The name of the admin.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Response**:
  ```json
  {
    "assignments": [
      {
        "task": "Complete React.js Task",
        "status": "pending",
        "createdAt": "2024-11-17T12:34:56Z"
      }
    ]
  }
  ```

### 7. **Approve/Reject Assignment (Protected Route)**
- **Route**: `http://localhost:5000/api/admins/assignments/:assignmentId/:status`
- **Description**: Admin can approve or reject an assignment. Requires authentication via JWT token.
- **Request Body**:
  ```json
  {
    "taskId": "taskId123",
    "status": "accepted"  // "rejected" is also a valid option
  }
  ```
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Assignment updated successfully",
    "assignment": {
      "task": "Complete React.js Task",
      "status": "accepted"
    }
  }
  ```

## JWT Authentication

The application uses **JWT (JSON Web Tokens)** for authentication:

- When users or admins log in, they receive a JWT token.
- This token must be included in the `Authorization` header of protected routes using the **Bearer** scheme.
  
  Example:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```

### Token Expiry

The JWT token expires based on the `JWT_EXPIRES_IN` value set in the `.env` file. If the token expires, the user must log in again to obtain a new token.

## Directory Structure

```bash
├── config/
│   └── db.js                # MongoDB connection setup
├── controllers/
│   ├── adminController.js    # Admin related logic
│   └── userController.js     # User related logic
├── models/
│   ├── assignment.js         # Assignment schema
│   └── user.js               # User schema
├── routes/
│   ├── adminRoutes.js        # Admin related routes
│   └── userRoutes.js         # User related routes
├── .env                      # Environment variables
├── package.json              # Project dependencies and scripts
└── server.js                 # Main entry point for the application
```

## Error Handling

- The application has centralized error handling that returns error messages in the following format:
  ```json
  {
    "error": "Error message"
  }
  ```

## Testing

To test the API endpoints, you can use tools like **Postman** or **Insomnia** to make requests to the defined routes. Ensure that the server is running before making requests.

## Contribution

Contributions to this project are welcome! Please fork the repository and submit pull requests for any bug fixes, features, or improvements.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push to your forked repository.
6. Create a pull request with a description of your changes.

