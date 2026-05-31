# Recipe Sharing Platform

A full-stack Recipe Sharing Platform built with the MERN Stack that allows users to register, authenticate, create recipes, view recipes, edit their own recipes, and view recipe images using TheMealDB API.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Recipe Management

* Create Recipe
* View All Recipes
* View Recipe Details
* Edit Own Recipes
* Owner Authorization

### External API Integration

* Recipe image integration using TheMealDB API
* Default image fallback when no image is available

### User Experience

* Responsive Bootstrap UI
* Dashboard Welcome Message
* Recipe Cards
* Image Loading Spinner
* Navbar Navigation
* Logout Functionality

---

## Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* Bootstrap

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

---

## Project Structure

```text
backend/
frontend/
```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

---

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Recipes

```http
GET    /api/recipes
GET    /api/recipes/:id
POST   /api/recipes
PUT    /api/recipes/:id
```

---

## Authorization

Only the owner of a recipe can edit that recipe.

Protected routes require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <token>
```

---

## External API

The application integrates with TheMealDB API to fetch recipe images.

```text
https://www.themealdb.com
```

If no matching recipe image is found, a default image is displayed.

---

## Future Improvements

* Delete Recipe Feature
* Recipe Search
* Pagination
* User Profiles
* Recipe Categories

---

## Author

Sharon T S

Full Stack Developer (MERN Stack)
