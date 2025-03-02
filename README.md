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
- [Postman API Collection](https://compliance-management.postman.co/workspace/Compliance-Management-Workspac~dc2b7b45-7996-4de3-8413-39e6bf0d81e1/collection/21154424-6c1c6ea6-d68d-478d-ac66-df8a41e4536a?action=share&creator=21154424)

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
- Axios
- Context API

### **Backend**

- Node.js (Express)
- TypeScript
- Firebase Admin SDK
- Firestore

### **Authentication & Deployment**

- Firebase Authentication (Email/Google Sign-In)
- Renderer (Backend)
- Firebase Hosting (Frontend)

---

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- Firebase CLI (for deployment)
- Firestore

### Installation

```sh
git clone https://github.com/degenta69/zimozi.git
cd zimozi
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the required values:

```env
VITE_API_BASE_URL_LOCAL = http://localhost:9001
VITE_API_BASE_URL_LIVE = https://zimozi.onrender.com

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_FIREBASE_SERVICE_ACCOUNT=
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

### **Frontend (Vercel/Firebase Hosting)**

```sh
npm run vite:deploy
```

---

## Architecture Overview

### 1. Authentication & Authorization

- Firebase Authentication is used for user login via Email/Google.
- Role-Based Access Control (RBAC) is implemented using Firebase Admin SDK, allowing admins to manage products while regular users can only browse and purchase.

### 2. Backend Architecture (Node.js + Express)

- **Modular Approach:** The backend follows a clean separation of concerns:
  - **Controllers:** Handle request validation and responses.
  - **Services:** Contain business logic and interact with the database.
  - **Middlewares:** Used for authentication and role-based access control.
- **Database:** Firestore stores users, products, carts, and orders.

### 3. Frontend Architecture (React + Vite)

- **Separation of Concerns:**
  - **Client Layer (React Components):** Manages UI and user interactions.
  - **API Services Layer:** Separates API calls from UI logic, ensuring maintainability.
  - **API Consumption Layer:** Centralizes request handling with error handling and caching (Axios).
- **State Management:** Context API is used to manage global states efficiently.

### 4. Deployment

- Backend is deployed on **Renderer**
- Frontend is hosted on **Firebase Hosting** for seamless deployment.

---
