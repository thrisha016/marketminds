# Market Minds Backend

This is the backend API for the Market Minds application, built with Node.js, Express.js, and MongoDB.

## Features

- User authentication (signup and login) with JWT
- Secure password hashing with bcrypt
- MongoDB database integration
- CORS enabled for frontend communication
- Input validation and error handling
- Clean folder structure with routes, controllers, models, and middleware

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the backend directory and add the following environment variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/marketminds
   JWT_SECRET=your_super_secret_jwt_key_here
   ```
   - Replace `your_super_secret_jwt_key_here` with a strong secret key
   - Update `MONGO_URI` if using a different MongoDB setup

4. Start MongoDB service (if running locally):
   ```bash
   # On Linux/Mac
   sudo systemctl start mongod
   # Or use brew services start mongodb-community
   ```

### Running the Server

Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000` (or the port specified in `.env`).

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ "name": "string", "email": "string", "password": "string" }`

- `POST /api/auth/login` - Login user
  - Body: `{ "email": "string", "password": "string" }`

- `GET /api/auth/me` - Get current user info (requires authentication)
  - Headers: `Authorization: Bearer <token>`

## Project Structure

```
backend/
├── server.js              # Main server file
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
└── src/
    ├── config/
    │   └── database.js    # MongoDB connection
    ├── controllers/
    │   └── authController.js  # Authentication logic
    ├── middleware/
    │   ├── auth.js        # JWT authentication middleware
    │   └── errorHandler.js # Error handling middleware
    ├── models/
    │   └── User.js        # User model
    └── routes/
        ├── auth.js        # Authentication routes
        └── index.js       # Main routes file
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **express-validator** - Input validation

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Input validation and sanitization
- Error handling middleware
- CORS configuration

## Connecting to Frontend

The backend is configured with CORS to allow communication with the React frontend. Make sure your frontend is running on a different port (typically 3000 for React) and update any proxy settings if needed.

For development, you can add a proxy in your frontend's `package.json`:
```json
"proxy": "http://localhost:5000"
```

This allows your frontend to make requests to `/api/*` without specifying the full backend URL.