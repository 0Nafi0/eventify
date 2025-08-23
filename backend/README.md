# Eventify Backend - Authentication System

This is the backend implementation for Eventify, a university club event management portal with JWT token-based authentication and role-based access control.

## Features

- **JWT Token Authentication**: Secure token-based authentication system
- **Role-Based Access Control**: Two user roles - Student and Club Admin
- **User Management**: Registration, login, profile management, and password changes
- **Input Validation**: Comprehensive validation using express-validator
- **Error Handling**: Global error handling with consistent response format
- **Security**: Password hashing with bcrypt, CORS protection

## Tech Stack

- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: cors middleware

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   └── authController.js     # Authentication logic
├── middleware/
│   ├── auth.js              # JWT authentication & authorization middleware
│   └── errorHandler.js      # Global error handling
├── models/
│   └── User.js              # User model with role-based schema
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   └── index.js             # Main routes index
├── utils/
│   ├── generateToken.js     # JWT token generation
│   └── validateInput.js     # Input validation rules
├── server.js                # Main server file
├── package.json             # Dependencies and scripts
└── env.example              # Environment variables template
```

## Installation

1. **Quick Start (Windows)**:
   ```bash
   # Double-click start-server.bat or run:
   start-server.bat
   ```

2. **Manual Installation**:
   ```bash
   # Install dependencies
   npm install
   
   # Run setup script
   npm run setup
   ```

3. **Environment Setup**:
   - Copy `env.example` to `.env`
   - Update the values according to your setup:
     ```env
     PORT=3001
     NODE_ENV=development
     MONGODB_URI=mongodb://localhost:27017/eventify
     JWT_SECRET=your_secure_jwt_secret_key
     JWT_EXPIRE=7d
     FRONTEND_URL=http://localhost:3000
     ```

3. **Database Setup**:

   - Ensure MongoDB is running
   - The database will be created automatically on first connection

4. **Start the server**:
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   
   # Check port availability
   npm run check-ports
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Public Routes

- **POST** `/register` - User registration

  - **Body**: `{ firstName, lastName, email, password, role, studentId/clubName, department?, phone? }`
  - **Roles**: `student` or `club_admin`
  - **Student Required**: `studentId`
  - **Club Admin Required**: `clubName`

- **POST** `/login` - User authentication
  - **Body**: `{ email, password }`
  - **Returns**: JWT token and user data

#### Protected Routes (Require JWT Token)

- **GET** `/profile` - Get current user profile
- **PUT** `/profile` - Update user profile
- **PUT** `/change-password` - Change user password
- **POST** `/logout` - User logout
- **POST** `/refresh` - Refresh JWT token

### Health Check

- **GET** `/api/health` - API health status

## User Roles & Permissions

### Student Role

- Can view and register for events
- Access to personal dashboard
- Profile management

### Club Admin Role

- Can create, edit, and delete events
- View attendee lists
- Profile management

## Authentication Flow

1. **Registration**: User provides details → Password hashed → JWT token generated
2. **Login**: Email/password verification → JWT token generated
3. **Protected Routes**: JWT token in Authorization header → User verified → Access granted
4. **Role Authorization**: Additional middleware checks user role for specific endpoints

## JWT Token Usage

Include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Expiration**: Configurable token expiration
- **Input Validation**: Comprehensive validation rules
- **CORS Protection**: Configurable cross-origin requests
- **Error Handling**: No sensitive information leaked in production

## Validation Rules

### Registration Validation

- **Names**: 2-50 characters, letters and spaces only
- **Email**: Valid email format
- **Password**: Minimum 6 characters, must contain uppercase, lowercase, and number
- **Student ID**: Required for students, 3-20 characters
- **Club Name**: Required for club admins, 2-100 characters

### Login Validation

- **Email**: Valid email format
- **Password**: Required

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ]
}
```

## Development

### Running in Development Mode

```bash
npm run dev
```

### Environment Variables

- `NODE_ENV`: Set to 'development' for detailed error messages
- `JWT_SECRET`: Use a strong, unique secret key
- `MONGODB_URI`: MongoDB connection string

### Database Indexes

The User model includes indexes for:

- Email (unique)
- Role
- Student ID (unique, sparse)

## Next Steps

This authentication system provides the foundation for:

1. **Event Management**: Create, read, update, delete events
2. **Event Registration**: Student registration/unregistration
3. **Attendee Management**: View and manage event attendees
4. **Club Management**: Club-specific features and permissions

## Testing

You can test the API endpoints using tools like:

- Postman
- Insomnia
- cURL
- Thunder Client (VS Code extension)

## Troubleshooting

### Port Issues
If you encounter port-related errors:

1. **Check port availability**:
   ```bash
   npm run check-ports
   ```

2. **Common solutions**:
   - Use a different port in your `.env` file
   - Stop other services using the same port
   - Restart your terminal/command prompt
   - Run as Administrator if needed

3. **Automatic port finding**: The server will automatically find an available port if the specified one is busy.

### Common Errors

- **EACCES (Permission denied)**: Try a different port or run as Administrator
- **EADDRINUSE (Port already in use)**: Use `npm run check-ports` to find available ports
- **MongoDB connection failed**: Ensure MongoDB is running and accessible

### Getting Help

1. Check the error logs in your terminal
2. Ensure all environment variables are properly configured
3. Verify MongoDB is running
4. Use the troubleshooting scripts provided

## Support

For issues or questions, check the error logs and ensure all environment variables are properly configured.
