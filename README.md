# MediQueue Server

Backend API server for MediQueue — a smart tutor booking platform.

## Live Server URL

https://your-server-url.vercel.app

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- CORS
- Dotenv

## Features

- ✅ JWT Authentication for private routes
- ✅ Tutor CRUD operations (Create, Read, Update, Delete)
- ✅ Booking management with auto slot decrease
- ✅ Search tutors by name (case-insensitive)
- ✅ Filter tutors by session start date
- ✅ Booking cancel with status update (PATCH)
- ✅ Duplicate booking prevention
- ✅ Slot availability check before booking

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/jwt | Generate JWT token |

### Tutors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tutors | Get all tutors (search & filter) |
| GET | /tutors/:id | Get single tutor |
| GET | /tutors/my-tutors | Get user's tutors (private) |
| POST | /tutors | Add new tutor (private) |
| PUT | /tutors/:id | Update tutor (private) |
| DELETE | /tutors/:id | Delete tutor (private) |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /bookings | Get user's bookings (private) |
| POST | /bookings | Create booking (private) |
| PATCH | /bookings/:id | Cancel booking (private) |
| PUT | /bookings/:id | Update booking (private) |
| DELETE | /bookings/:id | Delete booking (private) 
