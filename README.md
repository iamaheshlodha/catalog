# Full-Stack Catalog System

This project implements a mini catalog system with support for products, variants, and add-ons (for food items). It consists of a Node.js/Express/TypeScript backend and a React/TypeScript frontend, utilizing PostgreSQL with Prisma for the database.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Product Management**: Add, list, and manage products with different types (Apparel, Electronics, Food).
- **Product Variants**: Define variants for products (e.g., size, color) with individual prices, stock, and SKUs.
- **Food Add-ons**: For food items, allow the definition of add-ons (e.g., extra cheese, double toppings) with associated prices.
- **Catalog Browsing**: Frontend displays products grouped by type.
- **Product Detail View**: Detailed view of products showing variants, and for food items, dynamic pricing based on selected add-ons.
- **Dynamic Pricing**: Real-time price updates on the frontend based on variant and add-on selections.

## Technologies Used

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

### Frontend
- React
- TypeScript

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
└── README.md
```




## Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version recommended)
- npm or Yarn
- PostgreSQL
- Git

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```
2. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or yarn install
   ```
4. Configure your PostgreSQL database:
   Create a `.env` file in the `backend` directory with your database connection string. Example:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/catalog_db"
   ```
   Replace `user`, `password`, and `catalog_db` with your PostgreSQL credentials and desired database name.

5. Run Prisma migrations to set up the database schema:
   ```bash
   npx prisma migrate dev --name init
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or yarn install
   ```
3. Create a `.env` file in the `frontend` directory to configure the backend API URL. Example:
   ```
   REACT_APP_API_BASE_URL=http://localhost:3000/api
   ```
   Adjust the URL if your backend is running on a different port or host.




## Running the Application

### Start the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Start the backend server:
   ```bash
   npm run dev
   # or yarn dev
   ```
   The backend server will typically run on `http://localhost:3000`.

### Start the Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Start the frontend development server:
   ```bash
   npm start
   # or yarn start
   ```
   The frontend application will typically open in your browser at `http://localhost:3001`.