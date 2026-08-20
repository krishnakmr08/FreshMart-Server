<div align="center">

# 🛒 FreshMart Server

### A scalable Node.js backend API for quick-commerce & delivery platforms

Built with **Fastify**, **MongoDB**, **JWT Authentication**, **Socket.IO**, and an **AdminJS** dashboard.

<br/>

![Node.js](https://img.shields.io/badge/Node.js-18+-3C873A?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-Backend-000000?style=for-the-badge&logo=fastify&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

[**🔗 Live Admin Demo**](https://rnfreshmart.onrender.com/admin) &nbsp;•&nbsp; [**📂 Repository**](https://github.com/krishnakmr08/FreshMart-Server)

</div>

<br/>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Admin Dashboard Preview](#-admin-dashboard-preview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the Server](#-running-the-server)
- [API Reference](#-api-reference)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Author](#-author)

<br/>

## 🚀 Overview

**FreshMart Server** is a high-performance REST API built with **Fastify** that powers a quick-commerce / delivery system — handling authentication, product management, order processing, and real-time communication.

The project follows a **modular backend architecture**, cleanly separating routes, controllers, middleware, and configuration to keep the codebase scalable, maintainable, and production-ready.

<br/>

## ✨ Features

| | |
|---|---|
| 🔐 | JWT-based authentication with refresh tokens |
| 👤 | Separate login flows for customers & delivery partners |
| 📦 | Full order management system |
| 🛍️ | Product & category APIs |
| ⚡ | High-performance server powered by Fastify |
| 🔌 | Real-time communication via Socket.IO |
| 🍃 | MongoDB database with Mongoose ODM |
| 🛠️ | AdminJS dashboard for data management |
| 🌱 | Seed scripts for quick database initialization |

<br/>

## 🖥️ Admin Dashboard Preview

<table>
<tr>
<td align="center"><b>Login</b></td>
<td align="center"><b>Dashboard</b></td>
</tr>
<tr>
<td><img src="./screenshots/admin-login.png" width="400"/></td>
<td><img src="./screenshots/admin-dashboard.png" width="400"/></td>
</tr>
<tr>
<td align="center"><b>Product Management</b></td>
<td align="center"><b>Customer Management</b></td>
</tr>
<tr>
<td><img src="./screenshots/products-management.png" width="400"/></td>
<td><img src="./screenshots/customer-details.png" width="400"/></td>
</tr>
</table>

<br/>

## 🧰 Tech Stack

| Technology | Purpose |
|:---|:---|
| **Node.js** | Backend runtime |
| **Fastify** | Web server framework |
| **MongoDB** | Database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication |
| **Socket.IO** | Real-time communication |
| **AdminJS** | Admin dashboard |
| **dotenv** | Environment variable management |
| **Nodemon** | Development server auto-reload |

<br/>

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

<br/>

## ⚙️ Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/krishnakmr08/FreshMart-Server.git
cd FreshMart-Server
npm install
```

<br/>

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

<br/>

## ▶️ Running the Server

**Development mode** *(with hot-reload via Nodemon)*
```bash
npm run dev
```

**Production mode**
```bash
npm start
```

By default, the server runs at:

```
http://localhost:3000
```

<br/>

## 📡 API Reference

> All endpoints are prefixed with `/api`

### 🔐 Authentication

| Method | Endpoint | Description |
|:------:|:---|:---|
| `POST` | `/api/customer/login` | Customer login |
| `POST` | `/api/delivery/login` | Delivery partner login |
| `POST` | `/api/refresh-token` | Refresh JWT token |
| `GET` | `/api/user` | Get user profile |
| `PATCH` | `/api/user` | Update user profile |

### 📦 Orders

| Method | Endpoint | Description |
|:------:|:---|:---|
| `POST` | `/api/order` | Create a new order |
| `GET` | `/api/order` | Get all orders |
| `GET` | `/api/order/:orderId` | Get order by ID |
| `PATCH` | `/api/order/:orderId/status` | Update order status |
| `POST` | `/api/order/:orderId/confirm` | Confirm order |

### 🛍️ Products

| Method | Endpoint | Description |
|:------:|:---|:---|
| `GET` | `/api/categories` | Get all product categories |
| `GET` | `/api/products/:categoryId` | Get products by category |

<br/>

<details>
<summary><b>📄 Example — Customer Login</b></summary>

<br/>

**Request**
```http
POST /api/customer/login
```

**Request Body**
```json
{
  "phone": "9999000022"
}
```

**Response**
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

</details>

<br/>

## 🗺️ Roadmap

- [ ] Payment integration
- [ ] Push notifications
- [ ] Redis caching
- [ ] API rate limiting
- [ ] Swagger API documentation
- [ ] Unit testing

<br/>

## 📜 License

This project is licensed under the **ISC License**.

<br/>

## 👤 Author

<div align="center">

**Krishna Kumar**

[![GitHub](https://img.shields.io/badge/GitHub-krishnakmr08-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/krishnakmr08)

</div>