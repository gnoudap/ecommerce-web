# E-Commerce Web Application

A full-stack e-commerce application built with React, Node.js, Express, and **MongoDB**.

## Technologies Used

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database (NoSQL)
- **JWT** - Authentication
- **Stripe** - Payment processing
- **Redis** - Rate limiting (optional)

### Frontend
- **React** & **Vite** - UI framework and build tool
- **Tailwind CSS** - Styling
- **Context API** - State management

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
  - You can also use MongoDB Atlas (cloud) - [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Redis** (optional, for rate limiting) - [Download here](https://redis.io/download/)
- **Stripe account** (for payments) - [Sign up here](https://stripe.com/)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gnoudap/ecommerce-web.git
   cd ecommerce-webapp
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## Configuration

### Important: Environment Variables Setup

1. **Backend configuration**
   - Copy `.env.example` to `.env` in the `backend` folder:
   ```bash
   cd backend
   cp .env.example .env
   ```
   - Edit the `.env` file with your actual values:
   ```env
   PORT=5000
   NODE_ENV=development

   # MongoDB Connection String
   MONGO_URI=mongodb://localhost:27017/ecommerce
   # For MongoDB Atlas, use: mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce

   JWT_SECRET=your_jwt_secret_key_here
   STRIPE_SECRET_KEY=your_stripe_secret_key
   REDIS_URL=redis://localhost:6379
   ```

2. **Frontend configuration**
   - Copy `.env.example` to `.env` in the `frontend` folder:
   ```bash
   cd frontend
   cp .env.example .env
   ```
   - Edit the `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

### Environment Variables Reference

<!-- AUTO-GENERATED: ENV -->
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | No | Server Configuration | `5000` |
| `NODE_ENV` | No | Environment Mode | `development` |
| `MONGO_URI` | Yes | MongoDB Configuration | `mongodb://localhost:27017/ecommerce` |
| `JWT_SECRET` | Yes | JWT Configuration | `your_jwt_secret_key...` |
| `STRIPE_SECRET_KEY` | Yes | Stripe Configuration (for payment processing) | `your_stripe_secret_key` |
| `REDIS_URL` | No | Redis Configuration (optional - for rate limiting) | `redis://localhost:6379` |
<!-- AUTO-GENERATED: END -->

## Running the Application

### Step 1: Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

**Option B: Use MongoDB Atlas (Cloud)**
- Create a free cluster at https://www.mongodb.com/cloud/atlas
- Get your connection string and update `MONGO_URI` in backend `.env`

### Step 2: Verify MongoDB is Running

```bash
# Check if MongoDB is accessible
mongosh
# or
mongo

# You should see a connection successful message
```

### Step 3: Start Redis (Optional)

```bash
# Windows
redis-server

# macOS/Linux
redis-server
```

### Step 4: Start the Backend Server

```bash
cd backend
npm run dev
```
Backend will run on **http://localhost:5000**

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
```

### Step 5: Start the Frontend Development Server

Open a new terminal:
```bash
cd frontend
npm run dev
```
Frontend will run on **http://localhost:5173**

### Step 6: Seed Admin User (Optional)

```bash
cd backend
npm run seed:admin
```

## Available Scripts

<!-- AUTO-GENERATED: SCRIPTS -->
| Command | Description |
|---------|-------------|
| `npm run server` | Starts the backend development server using nodemon |
| `npm run client` | Starts the frontend development server (`vite`) |
| `npm run dev` | Starts both frontend and backend concurrently |
| `npm run start` | Starts the backend server for production |
| `npm run build` | Installs all dependencies and builds the frontend for production |
| `npm run install-all` | Installs dependencies for root, backend, and frontend |
<!-- AUTO-GENERATED: END -->

## Usage

- Visit **http://localhost:5173** to access the application
- Register a new account or use the seeded admin credentials
- Browse products, add to cart, and complete checkout

## Database Information

This application uses **MongoDB** as the database:

- **Database Name**: `ecommerce`
- **Collections**: `users`, `products`, `orders`
- **ORM**: Mongoose for schema definition and data validation

### MongoDB Models

1. **User Model** (`backend/models/user.model.js`)
   - Stores user information, authentication credentials, and roles

2. **Product Model** (`backend/models/product.model.js`)
   - Stores product details, pricing, and inventory

3. **Order Model** (`backend/models/order.model.js`)
   - Stores order information and payment status

### Viewing Database Data

You can view the MongoDB data using:

**MongoDB Compass** (GUI):
```bash
# Download from: https://www.mongodb.com/products/compass
# Connect to: mongodb://localhost:27017
```

**MongoDB Shell** (CLI):
```bash
mongosh
use ecommerce
db.users.find()
db.products.find()
db.orders.find()
```

## Troubleshooting

### MongoDB Connection Issues

1. **Error: "MongooseServerSelectionError"**
   - Make sure MongoDB is running: `mongod` or `brew services start mongodb-community`
   - Check if port 27017 is not blocked
   - Verify `MONGO_URI` in your `.env` file

2. **Error: "Connection refused"**
   - MongoDB service is not started
   - Start MongoDB manually or as a service

3. **Using MongoDB Atlas?**
   - Whitelist your IP address in Atlas dashboard
   - Update `MONGO_URI` with your Atlas connection string
   - Include your username and password in the connection string

## Architecture (Codemap)

<!-- AUTO-GENERATED: CODEMAP -->
<!-- Generated: 2026-04-28 | Files scanned: ~25 | Token estimate: ~400 -->
### Backend Architecture

**Routes & Controllers:**
- `productRoutes.js` → `productController.js` (Catalog management)
- `userRoutes.js` → `userController.js` (Auth & profiles)
- `orderRoutes.js` → `orderController.js` (Checkout flow)
- `paymentRoutes.js` (Stripe integration)
- `uploadRoutes.js` (File uploads via Multer)

**Data Models (Mongoose):**
- `user.model.js` (Auth credentials, roles)
- `product.model.js` (Pricing, stock, reviews)
- `order.model.js` (Transaction status, totals)

**Key Middleware:**
- `cache.js` (Redis response caching)
- `rateLimiter.js` (API rate limiting)

### Frontend Architecture

**Pages:**
- `Home.jsx`, `AboutUs.jsx`, `Contact.jsx` (Landing & Static)
- `Products.jsx`, `ProductDetail.jsx` (Catalog & Viewing)
- `Cart.jsx`, `Checkout.jsx` (Shopping Flow)
- `Login.jsx`, `Register.jsx` (Authentication)
- `AdminDashboard.jsx` (Content & Order Management)

**Dependencies:**
- Tailwind CSS (Utility-first styling)
- Stripe React JS (Payments integration)
- React Router (Client-side navigation)
- React Hot Toast (Notifications)
<!-- AUTO-GENERATED: END -->

## Technologies Used

- **Frontend:** React, React Router, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Payment:** Stripe (in development)
- **Authentication:** JWT, bcryptjs
- **Caching:** Redis (in development)

## Website Access

[Click here](https://ecommerce-web-9ns.pages.dev/) to access the website.

### Admin user:
Username: [test123@gmail.com]
Password: [12345678]
