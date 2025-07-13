<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

# NestJS Todo API with Swagger

[![NPM Version](https://img.shields.io/npm/v/@nestjs/core.svg)](https://www.npmjs.com/package/@nestjs/core)
[![License](https://img.shields.io/npm/l/@nestjs/core.svg)](https://github.com/nestjs/nest/blob/master/LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dm/@nestjs/common.svg)](https://www.npmjs.com/package/@nestjs/common)
[![Discord](https://img.shields.io/badge/discord-online-brightgreen.svg)](https://discord.gg/G7Qnnhy)

---

## Description

This is a simple Todo REST API project built with NestJS(https://nestjs.com/) and MongoDB (via Mongoose).  
It supports user authentication with JWT and API documentation with Swagger.

---

## Features

- User registration and login with JWT authentication
- CRUD operations for Todos linked to authenticated users
- Swagger UI for interactive API documentation and testing
- Environment variables for configuration (MongoDB connection, JWT secret, etc.)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) >= 16.x
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

# Folder Structure
src/
├── auth/
├── todos/
├── users/
├── app.module.ts
└── main.ts


