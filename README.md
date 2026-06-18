# Roxiler Store Rating Platform

## Project Overview

This project was built for the Roxiler Systems Full Stack Intern Coding Challenge.

The application allows users to register, log in, view stores, submit ratings, and access different features based on their role. The system supports three types of users: Admin, Normal User, and Store Owner.

The project is developed using React for the frontend, Node.js and Express.js for the backend, and MySQL as the database.

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

### Database

* MySQL

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Logout Functionality



### Admin Features

* View Dashboard Statistics

  * Total Users
  * Total Stores
  * Total Ratings

* Create New Users

  * Admin
  * Store Owner
  * Normal User

* View All Users

* Search Users

* Sort Users by Name and Email

* Create New Stores

* View All Stores

* Sort Stores by Name and Email

---

### Normal User Features

* Register Account
* Login
* View Stores
* Search Stores
* Submit Ratings
* Update Existing Ratings
* Logout

---

### Store Owner Features

* Login
* View Store Dashboard
* View Average Store Rating
* View Users Who Submitted Ratings
* Logout

---

## Database Tables

### Users

| Field    | Type    |
| -------- | ------- |
| id       | INT     |
| name     | VARCHAR |
| email    | VARCHAR |
| password | VARCHAR |
| address  | TEXT    |
| role     | ENUM    |

### Stores

| Field    | Type    |
| -------- | ------- |
| id       | INT     |
| name     | VARCHAR |
| email    | VARCHAR |
| address  | TEXT    |
| owner_id | INT     |

### Ratings

| Field    | Type |
| -------- | ---- |
| id       | INT  |
| user_id  | INT  |
| store_id | INT  |
| rating   | INT  |

---

## Project Structure

### Frontend

```text
frontend
├── src
│   ├── api
│   ├── components
│   ├── context
│   ├── hooks
│   ├── pages
│   ├── routes
│   └── services
├── public
└── package.json
```

### Backend

```text
backend
├── config
├── controllers
├── middlewares
├── routes
├── services
├── validators
└── package.json
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Rushikes123/roxiler-store-rating-platform.git
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=roxiler_db

JWT_SECRET=your_secret_key
```

Start Backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Backend runs on:

```text
http://localhost:5000
```

---

## What I Learned

While building this project, I gained practical experience in:

* React Component Development
* REST API Development
* JWT Authentication and Authorization
* Role Based Access Control
* MySQL Database Design
* CRUD Operations
* Frontend and Backend Integration
* State Management using React Hooks
* Working with Protected Routes
* Building Full Stack Applications

---

## Developer

Rushikesh Raut

BE (ENTC)

Sinhgad College of Engineering, Pune
