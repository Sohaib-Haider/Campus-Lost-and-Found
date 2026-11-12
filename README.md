# Campus Lost & Found Board

A web app where students of one campus can post lost and found items, browse and search the board, and manage their own posts. Built with the MERN stack: MongoDB, Express, React and Node.js.

## Features

- Register, log in and stay logged in with a JWT
- Post a lost or found item with category, location, date and contact detail
- Browse the board, search by text, and filter by category, type and location
- Open an item's details, including items already returned
- My Posts page with edit, delete and mark as returned
- Ownership is enforced on the server: only the owner can edit, delete or mark a post returned

## Packages

**Backend:** express, mongoose, bcrypt, jsonwebtoken, dotenv, cors

**Frontend:** react, react-dom, react-router-dom, vite

## Requirements

- Node.js 20 or newer
- MongoDB running locally

## Setup

### 1. MongoDB

Start MongoDB and keep it running while you use the app. For a local install:

```bash
mongod --dbpath <folder for database files> --bind_ip 127.0.0.1 --port 27017
```

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env` from the example and set your own values:

```bash
cp .env.example .env
```

| Setting | Meaning | Example |
| --- | --- | --- |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/campus_lost_found` |
| `PORT` | Port for the API | `5000` |
| `JWT_SECRET` | Long random secret used to sign tokens | `replace_with_a_long_random_secret` |
| `FRONTEND_URL` | Frontend address allowed by CORS | `http://localhost:5173` |

Never commit `.env`.

Start the API:

```bash
npm run dev
```

Use `npm start` to run without file watching. Check it at `http://localhost:5000/api/health`.

### 3. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

To make a production build, run `npm run build` in the `frontend` folder.

## API

| Method | Route | Purpose | Login needed |
| --- | --- | --- | --- |
| GET | `/api/health` | Check the server is running | No |
| POST | `/api/auth/register` | Register a student | No |
| POST | `/api/auth/login` | Log in | No |
| GET | `/api/auth/me` | Get the current student | Yes |
| GET | `/api/items` | Browse, search and filter active items | No |
| GET | `/api/items/mine` | Get My Posts | Yes |
| GET | `/api/items/:id` | Get item details | No |
| POST | `/api/items` | Post an item | Yes |
| PUT | `/api/items/:id` | Edit an owned item | Yes |
| DELETE | `/api/items/:id` | Delete an owned item | Yes |
| PATCH | `/api/items/:id/returned` | Mark an owned item returned | Yes |

Private routes need an `Authorization: Bearer <token>` header. The board accepts the optional query values `search`, `category`, `type` and `location`. Item dates use the format `YYYY-MM-DD`.

## Project structure

```text
backend/
  config/       database connection
  controllers/  request handlers
  middleware/   login checks
  models/       Mongoose models
  routes/       API routes
  utils/        shared input checks
  server.js
frontend/
  src/
    components/
    data/
    pages/
docs/           project plans
```
