# E-Commerce Platform

This project is a minimal e-commerce platform built using **Node.js (Express), TypeScript, Firebase Authentication, and Firestore/PostgreSQL**. The frontend is built with **React 19 (Next.js/Vite) and TailwindCSS**. It supports user authentication, product management, shopping cart functionality, and order processing.

You can access the deployed version of this application at [this hosted link](https://zimozi-b21dc.web.app).

## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [API Testing](#api-testing)
- [Deployment](#deployment)
- [Architecture Overview](#architecture-overview)

---

## Project Structure

```
.
├── src
│   ├── client-api-service  # API service for frontend
│   ├── components          # Reusable UI components
│   ├── context             # Global state management (Auth, Cart)
│   ├── models              # TypeScript models for data types
│   ├── pages               # Next.js pages for different views
│   ├── server              # Backend (Express API, Routes, Controllers, Services)
│   ├── styles              # Global styles and Tailwind config
│   ├── tests               # Unit and integration tests
│   ├── typings             # TypeScript types
│   ├── utils               # Helper functions
│   ├── firebase-client-config.ts  # Firebase frontend config
│   ├── index.tsx           # Entry point for the frontend
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.mts         # Vite configuration
├── firebase.json           # Firebase deployment config
├── README.md               # Documentation
```

---

## Tech Stack

### **Frontend**

- React 19 (Next.js/Vite)
- TypeScript
- TailwindCSS
- React Query / Axios
- Redux / Zustand / Context API

### **Backend**

- Node.js (Express)
- TypeScript
- Firebase Admin SDK
- Firestore / PostgreSQL

### **Authentication & Deployment**

- Firebase Authentication (Email/Google Sign-In)
- Firebase Functions (Backend)
- Vercel / Netlify / Firebase Hosting (Frontend)

---

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- Firebase CLI (for deployment)
- PostgreSQL (if using relational DB instead of Firestore)

### Installation

```sh
git clone https://github.com/yourusername/your-repo.git
cd your-repo
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the required values:

```env
VITE_API_BASE_URL_LOCAL=http://localhost:9001
VITE_API_BASE_URL_LIVE=https://your-backend-url.com
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

---

## Running the Project

### **Frontend**

```sh
npm run dev
```

This starts the frontend on `http://localhost:5173`.

### **Backend**

```sh
npm run api:dev
```

This starts the Express server on `http://localhost:9001`.

---

## API Testing

- Import the provided **Postman collection** (`postman_collection.json`) to test API endpoints.
- Ensure `withCredentials: true` is enabled in API requests.

---

## Deployment

### **Backend (Firebase Functions)**

```sh
firebase deploy --only functions
```

### **Frontend (Vercel/Firebase Hosting)**

```sh
npm run vite:deploy
```

---

## Architecture Overview

### **1. Authentication**

- Uses Firebase Authentication (Email/Google Sign-In).
- Session persistence enabled for better UX.

### **2. Role-Based Access Control (RBAC)**

- Admin users can manage products, orders, and users.
- Regular users can browse products, add to cart, and place orders.

### **3. Backend (Express API)**

- Modular structure with controllers, services, and middlewares.
- Uses Firebase Admin SDK for authentication and Firestore/PostgreSQL for data storage.
- API follows RESTful conventions.

### **4. Frontend (React + Vite/Next.js)**

- Component-based design for reusability.
- Uses Zustand/Context API for state management.
- Optimized for performance with lazy loading and React Query.

### **5. Database Choices**

- Firestore (NoSQL, serverless, real-time sync) or PostgreSQL (relational, structured data).
- Database choice depends on use case.

---

This should provide all the necessary details for setting up, running, and submitting the project. Let me know if any refinements are needed!
