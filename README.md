# E-Commerce Web Application

A full-stack e-commerce application built with React, Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis (optional, for rate limiting)
- Stripe account (for payments)

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
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

1. **Backend configuration**
   - Create a `.env` file in the `backend` folder with the following:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   REDIS_URL=redis://localhost:6379
   NODE_ENV=development
   ```

2. **Frontend configuration**
   - Create a `.env` file in the `frontend` folder with the following:
   ```
   VITE_API_URL=http://localhost:5000
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

## Running the Application

1. **Start MongoDB**
   - Make sure MongoDB is running on your system

2. **Start Redis (optional)**
   - If using Redis for rate limiting, start Redis server

3. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on http://localhost:5000

4. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on http://localhost:5173

5. **Seed admin user (optional)**
   ```bash
   cd backend
   npm run seed:admin
   ```

## Usage

- Visit http://localhost:5173 to access the application
- Register a new account or use the seeded admin credentials
- Browse products, add to cart, and complete checkout

## Project Structure

```
ecommerce-webapp/
├── backend/           # Node.js/Express backend
│   ├── config/       # Database and service configurations
│   ├── controllers/  # Request handlers
│   ├── middleware/   # Custom middleware
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── scripts/      # Utility scripts
│   └── utils/        # Helper functions
└── frontend/         # React frontend
    ├── public/       # Static files
    └── src/
        ├── components/  # Reusable components
        ├── context/     # React context
        ├── pages/       # Page components
        └── services/    # API services
```

## Technologies Used

- **Frontend:** React, React Router, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Payment:** Stripe (in development)
- **Authentication:** JWT, bcryptjs
- **Caching:** Redis (in development)