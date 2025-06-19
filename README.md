# JamTogether

A collaborative platform for musicians to organize and join jam sessions, connecting music enthusiasts based on instruments, genres, and locations.

## 🎵 Features

### Core Functionality

- **User Authentication & Profiles**: Secure registration and login with comprehensive musician profiles
- **Event Management**: Create, browse, edit, and delete jam session events
- **Join Requests**: Request to join events with specific instruments, with approval workflow
- **Smart Matching**: Filter events by date, location, genres, and required instruments
- **Favorites System**: Save and manage favorite jam sessions
- **Real-time Updates**: Dynamic event status and participant management

### User Features

- **Musician Profiles**: Showcase instruments played, experience levels, location, and bio
- **Profile Pictures**: Upload and manage profile images
- **Event History**: Track created events, join requests, and participation history
- **Advanced Filtering**: Search events by multiple criteria including date ranges, genres, and locations

### Admin Features

- **User Management**: View, edit, and manage all platform users
- **Event Moderation**: Monitor and manage all jam session events
- **Security Monitoring**: Real-time security status and rate limiting controls

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library with modern hooks and features
- **Material UI 7** - Component library for consistent design
- **React Router 6** - Client-side routing
- **Formik & Yup** - Form handling and validation
- **SWR** - Data fetching and caching
- **Date-fns** - Date manipulation utilities
- **Vite** - Build tool and development server

### Backend

- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Express Rate Limit** - API rate limiting
- **Joi** - Request validation

### Security

- CORS protection
- Input sanitization
- Rate limiting and brute force protection
- Secure password hashing
- JWT token authentication
- File upload validation

## 📦 Installation

### Prerequisites

- Node.js 18.0.0 or higher
- MongoDB 6.0 or higher
- npm or yarn

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Usee the `.env` file in the server directory which provided with the project.

````

4. Seed the database with sample data:

```bash
npm run seed
```

5. Start the server:

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
````

5. Seed the database with sample data:

```bash
npm run seed
```

### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Usee the `.env` file in the client directory which provided with the project.

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📚 API Overview

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### User Endpoints

- `GET /api/users/:username` - Get user profile
- `PATCH /api/users/:id` - Update user profile
- `POST /api/users/:id/profile-picture` - Upload profile picture

### Event Endpoints

- `GET /api/events` - List all events (with filters)
- `POST /api/events` - Create new event
- `GET /api/events/:id` - Get event details
- `PATCH /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/like` - Toggle event like
- `GET /api/events/user/:userId` - Get user's events

### Join Request Endpoints

- `POST /api/requests` - Create join request
- `GET /api/requests/my-requests` - Get user's requests
- `PATCH /api/requests/:id/approve` - Approve request
- `PATCH /api/requests/:id/reject` - Reject request
- `DELETE /api/requests/:id` - Cancel request

### Admin Endpoints

- `GET /api/admin/users` - List all users
- `GET /api/admin/events` - List all events
- `GET /api/admin/analytics` - Get platform analytics

## 📁 Project Structure

```
jam-together/
├── client/                    # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── features/         # Feature-based modules
│   │   ├── pages/           # Route page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service functions
│   │   ├── contexts/        # React contexts
│   │   ├── utils/           # Utility functions
│   │   └── App.jsx          # Main application component
│   └── package.json
│
├── server/                    # Express backend application
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── utils/           # Utility functions
│   │   ├── validation/      # Request validation schemas
│   │   ├── app.js          # Express app configuration
│   │   └── server.js       # Server entry point
│   └── package.json
│
└── README.md
```

## 🚀 Deployment

### Production Build

#### Frontend

```bash
cd client
npm run build
```

The production-ready files will be in the `client/dist` directory.

#### Backend

Ensure all environment variables are properly set for production, including:

- Set `NODE_ENV=production`
- Use a strong `JWT_SECRET`
- Configure `MONGO_URI` with production database
- Set appropriate `FRONTEND_URL`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Material UI for the component library
- The React and Node.js communities
- All contributors who help improve this platform
- My little brother

---

Built with ❤️ for musicians by musicians
