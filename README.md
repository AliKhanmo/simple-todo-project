# Todo API — Production-ready REST API with JWT Auth & Swagger

![CI](https://github.com/AliKhanmo/simple-todo-project/actions/workflows/ci.yml/badge.svg)

## Description

A production-ready backend API for managing personal todo lists.
Built with NestJS and MongoDB, featuring JWT authentication,
ownership-based access control, Swagger documentation,
9 unit tests, and automated CI with GitHub Actions.

## Tech Stack

- NestJS + TypeScript
- MongoDB + Mongoose
- JWT Authentication (Passport.js)
- Swagger / OpenAPI
- Jest (9 unit tests)
- GitHub Actions CI

## Features

- User registration and login with JWT authentication
- CRUD operations for Todos linked to authenticated users
- Swagger UI for interactive API documentation and testing
- Environment variables for configuration (MongoDB connection, JWT secret, etc.)
- 9 unit tests covering auth and todo services
- Automated CI pipeline via GitHub Actions

## API Endpoints

POST /api/auth/register — Register a new user
POST /api/auth/login — Login and receive JWT token
GET /api/todos — Get all todos for authenticated user
POST /api/todos — Create a new todo
PATCH /api/todos/:id — Update a todo by ID
DELETE /api/todos/:id — Delete a todo by ID

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) >= 20.x
- [MongoDB](https://www.mongodb.com/) installed and running locally or remotely
- npm

---

### Installation

```bash
# Clone the repository
git clone https://github.com/AliKhanmo/simple-todo-project.git

# Install dependencies
npm install

# Start the development server:
npm run start:dev

# API Documentation
http://localhost:3000/api-docs

## Environment Variables
PORT=
MONGODB_URI=
JWT_SECRET=
```
