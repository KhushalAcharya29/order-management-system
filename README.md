# Order Management System

This is a full-stack web application for managing product orders, built as a technical assignment. It features a public-facing form for customers to place orders and a protected admin dashboard for managing them.

---

## Features

* **Customer:** Public form to place a new order with an image upload.
* **Admin:** A secure dashboard to view, filter, edit, and delete orders.
* **Real-time Updates:** The admin dashboard uses polling to automatically show new orders.
* **Authentication:** Secure JWT-based authentication for all admin actions.

---

## Tech Stack

**Frontend:**
* Next.js 14 (App Router)
* React & Tailwind CSS
* React Hot Toast (for notifications)

**Backend:**
* Node.js & Express.js
* MongoDB (with Mongoose)
* JSON Web Tokens (JWT)
* Multer for file uploads

---

## Setup and Installation

### Prerequisites
* Node.js (v22.19.0 or later)
* npm
* MongoDB (a local instance or a cloud connection string)

### 1. Backend Setup

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file in this folder and add the following variables:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=a_strong_secret_key_for_jwt
# PORT=5000

# Start the backend server
npm start

### 2\. Frontend Setup

# From the root project folder, navigate to the frontend
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev

The application will now be running at **http://localhost:3000**.

-----

## Admin Credentials

You can use the following credentials to log in to the admin dashboard at `http://localhost:3000/admin/login`:

  * **Email:** `admin@example.com`
  * **Password:** `admin123`