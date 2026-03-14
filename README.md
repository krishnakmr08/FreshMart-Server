# 🚀 FreshMart Server

A scalable **Node.js backend API** built with **Fastify**, featuring
**MongoDB integration, JWT authentication, Socket.IO real-time support,
and an AdminJS dashboard** for data management.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Fastify](https://img.shields.io/badge/Fastify-Backend-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![License](https://img.shields.io/badge/License-ISC-blue)
![GitHub stars](https://img.shields.io/github/stars/krishnakmr08/FreshMart-Server)

This backend powers a **quick-commerce / delivery system** with
authentication, product management, order processing, and real-time
updates.

---

## 🌐 Live Demo

Admin Panel:  
https://freshmart-ctsy.onrender.com/admin

---

## 📌 Description

FreshMart Server is a **high-performance REST API** built with
**Fastify** that handles authentication, product management, orders, and
real-time communication.

The project follows a **modular backend architecture** separating
routes, controllers, middleware, and configuration to keep the codebase
clean, scalable, and production-ready.

---

## ✨ Features

- 🔐 JWT Authentication
- 👤 Customer & Delivery Partner Login
- 📦 Order Management System
- 🛍 Product & Category APIs
- 🔄 Token Refresh System
- ⚡ Fastify high-performance server
- 📡 Real-time communication with Socket.IO
- 🗄 MongoDB database with Mongoose
- 🧠 AdminJS dashboard for managing data
- 🌱 Seed scripts for database initialization

---

## 📸 Admin Dashboard

### Login

![Admin Login](./screenshots/admin-login.png)

### Dashboard

![Admin Dashboard](./screenshots/admin-dashboard.png)

### Product Management

![Products](./screenshots/products-management.png)

### Customer Management

![Customers](./screenshots/customer-details.png)

---

## 🛠 Tech Stack

| Technology | Purpose                 |
| ---------- | ----------------------- |
| Node.js    | Backend runtime         |
| Fastify    | Web server framework    |
| MongoDB    | Database                |
| Mongoose   | MongoDB ODM             |
| JWT        | Authentication          |
| Socket.IO  | Real-time communication |
| AdminJS    | Admin dashboard         |
| dotenv     | Environment variables   |
| Nodemon    | Development server      |

---

## 📁 Project Structure

```
freshmart-server
│
├── screenshots
│   ├── admin-login.png
│   ├── admin-dashboard.png
│   ├── products-management.png
│   └── customer-details.png
│
├── src
│   ├── config
│   │   ├── admin.js
│   │   ├── config.js
│   │   └── connect.js
│   │
│   ├── controllers
│   │   ├── auth
│   │   │   └── auth.js
│   │   ├── order
│   │   │   └── order.js
│   │   ├── products
│   │   │   ├── category.js
│   │   │   └── products.js
│   │   └── tracking
│   │       └── user.js
│   │
│   ├── middleware
│   │   └── auth.js
│   │
│   ├── models
│   │
│   └── routes
│       ├── auth.js
│       ├── order.js
│       ├── products.js
│       └── index.js
│
├── .env
├── app.js
├── seedData.js
├── seedScript.js
├── package.json
└── package-lock.json
```

---

## ⚙️ Installation

```bash
git clone https://github.com/krishnakmr08/FreshMart-Server.git
cd FreshMart-Server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=strong_admin_password

COOKIE_PASSWORD=secure_cookie_secret

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

---

## ▶️ Run Server

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

Server runs at:

```
http://localhost:3000
```

---

## 📡 API Endpoints

All endpoints are prefixed with `/api`

### 🔐 Authentication

| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| POST   | `/api/customer/login` | Customer login         |
| POST   | `/api/delivery/login` | Delivery partner login |
| POST   | `/api/refresh-token`  | Refresh JWT token      |
| GET    | `/api/user`           | Get user profile       |
| PATCH  | `/api/user`           | Update user profile    |

---

### 📦 Orders

| Method | Endpoint                      | Description         |
| ------ | ----------------------------- | ------------------- |
| POST   | `/api/order`                  | Create a new order  |
| GET    | `/api/order`                  | Get all orders      |
| GET    | `/api/order/:orderId`         | Get order by ID     |
| PATCH  | `/api/order/:orderId/status`  | Update order status |
| POST   | `/api/order/:orderId/confirm` | Confirm order       |

---

### 🛍 Products

| Method | Endpoint                    | Description                |
| ------ | --------------------------- | -------------------------- |
| GET    | `/api/categories`           | Get all product categories |
| GET    | `/api/products/:categoryId` | Get products by category   |

---

## 📡 API Example

### Customer Login

```
POST /api/customer/login
```

**Request Body:**

```json
{
  "phone": "9999000022"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "customer": {
    "phone": "9999000022",
    "role": "Customer"
  }
}
```

---

## 🔮 Future Improvements

- 💳 Payment Integration
- 🔔 Push Notifications
- ⚡ Redis caching
- 🚀 API Rate Limiting
- 📄 Swagger API Documentation
- 🧪 Unit Testing

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Krishna Kumar**  
[github.com/krishnakmr08](https://github.com/krishnakmr08)
