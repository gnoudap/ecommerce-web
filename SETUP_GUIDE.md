# Quick Setup Guide for Professor

## What This Application Uses

This is a **full-stack e-commerce web application** that uses:
- **Backend**: Node.js + Express + **MongoDB (Mongoose)**
- **Frontend**: React + Vite + Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Processing**: Stripe

## Database: MongoDB

This application uses **MongoDB** as its database system (NoSQL document database).

### Why MongoDB?
- Perfect for e-commerce applications with flexible product schemas
- Easy to scale and modify data structures
- Works great with Node.js through Mongoose ODM

### Database Collections
The application creates three main collections:
1. **users** - Stores user accounts and authentication
2. **products** - Stores product catalog
3. **orders** - Stores customer orders and payment information

## Quick Start Instructions

### 1. Install MongoDB

**Download and Install:**
- Visit: https://www.mongodb.com/try/download/community
- Download MongoDB Community Server for your OS
- Follow installation wizard (keep default settings)

**Verify Installation:**
```bash
mongod --version
```

### 2. Start MongoDB

```bash
# Windows (run in Command Prompt or PowerShell)
mongod

# Leave this terminal running!
```

### 3. Configure Environment Variables

**Backend:**
```bash
cd backend
copy .env.example .env
```
Edit the `.env` file - the MongoDB connection is already configured for local use:
```
MONGO_URI=mongodb://localhost:27017/ecommerce
```

**Frontend:**
```bash
cd frontend
copy .env.example .env
```
(Default values should work fine for local testing)

### 4. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in a new terminal)
cd frontend
npm install
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ You should see: "MongoDB Connected: localhost"

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 3 - View Database (Optional):**
```bash
mongosh
use ecommerce
db.users.find()
```

### 6. Access the Application

- Open browser: http://localhost:5173
- Backend API: http://localhost:5000

## Viewing the MongoDB Database

### Option 1: MongoDB Compass (GUI - Recommended)
1. Download: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Open database: `ecommerce`
4. View collections: users, products, orders

### Option 2: MongoDB Shell (CLI)
```bash
mongosh
use ecommerce
show collections
db.users.find().pretty()
db.products.find().pretty()
db.orders.find().pretty()
```

## Project Features

✅ User authentication (register/login)
✅ Product catalog browsing
✅ Shopping cart functionality
✅ Checkout process
✅ Admin dashboard
✅ Order management
✅ Payment processing (Stripe)

## Important Files to Review

### MongoDB Configuration
- [backend/config/db.js](backend/config/db.js) - Database connection setup

### MongoDB Models (Schemas)
- [backend/models/user.model.js](backend/models/user.model.js)
- [backend/models/product.model.js](backend/models/product.model.js)
- [backend/models/order.model.js](backend/models/order.model.js)

### API Controllers
- [backend/controllers/userController.js](backend/controllers/userController.js)
- [backend/controllers/productController.js](backend/controllers/productController.js)
- [backend/controllers/orderController.js](backend/controllers/orderController.js)

## Troubleshooting

### "MongooseServerSelectionError"
- ❌ MongoDB is not running
- ✅ Start MongoDB: `mongod`

### "Port 5000 already in use"
- Change PORT in `backend/.env` to 5001 or 5002

### "Module not found"
- Run `npm install` in both backend and frontend folders

## Notes for Grading

- All MongoDB operations use Mongoose ODM for data validation and schema management
- Database connection is established in `backend/config/db.js`
- All models follow proper schema design patterns
- CRUD operations are implemented in controllers
- Proper error handling for database operations
- Environment variables are used for configuration (see `.env.example` files)

---

For detailed documentation, see the main [README.md](README.md)
