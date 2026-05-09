# ⚡ Cyper Ecommerce Platform - Client

Modern technology ecommerce frontend built with **Next.js 15**, **React 19**, **TypeScript**, and scalable frontend architecture.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss)
![React Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-black?style=for-the-badge)

---

# 📋 Overview

Cyper Client is the frontend application of the **Cyper Ecommerce Platform** — a modern and scalable technology shopping platform focused on performance, responsive UI/UX, and real-world ecommerce architecture.

The application provides a smooth shopping experience with advanced filtering, authentication, cart persistence, wishlist management, secure checkout flow, and optimized data fetching.

---

# ✨ Features

## 🔐 Authentication & Security

- Login / Register with JWT Authentication
- Google OAuth2 Login Integration
- Protected Routes Middleware
- Persistent Authentication State
- Change Password Feature
- Update User Profile

---

## 🛒 Ecommerce Features

- Product Catalog & Categories
- Product Detail Page
- Shopping Cart Flow
- Wishlist Flow
- Order Flow
- Address Book Management
- Vietnam Provinces API Integration
- Dynamic Address Selection:
  - Province / City
  - District
  - Ward
- Integrated Checkout Address Flow
- MoMo Payment Integration
- Product Search & Sorting
- Product Pagination
- Infinite Loading UI
- Rating & Price Filtering
- Product Specifications Filtering


---

## 🔎 Advanced Filtering System

- URL Sync Filter System
- Advanced Multi Filter
- Search Params Persistence
- Responsive Mobile Filter Sidebar
- Dynamic Product Filtering

---

## ⚡ Performance & UX

- React Query Caching & Data Fetching
- Skeleton Loading UI
- Infinite Scroll Experience
- Optimistic UI Updates
- Responsive Mobile-First Design
- Reusable Component Architecture
- Clean UI with Shadcn/UI

---

## 🧠 State Management

- Zustand Store Management
- Search History saved in LocalStorage
- Checkout Flow State Management
- Persistent Cart State

---

## ☁️ Media & Storage

- Upload Avatar to Cloudinary
- Image Storage Optimization

---

# 🛠️ Tech Stack

| Category             | Technology                     |
| -------------------- | ------------------------------ |
| **Framework**        | Next.js 15.5 (App Router)      |
| **Language**         | TypeScript 5                   |
| **UI Library**       | React 19                       |
| **Styling**          | Tailwind CSS 4                 |
| **UI Components**    | Shadcn/UI + Radix UI           |
| **Data Fetching**    | TanStack Query (React Query) 5 |
| **State Management** | Zustand                        |
| **Form Handling**    | Zod + React Hook Form          |
| **HTTP Client**      | Axios                          |
| **Icons**            | Lucide React                   |
| **Slider**           | Swiper.js                      |
| **Cloud Storage**    | Cloudinary                     |
| **Payment**          | MoMo Payment API Sandbox       |
| **Notifications**    | React Hot Toast                |

---

# 📁 Project Structure

```
src
├── app
│   ├── (main)
│   │   ├── about
│   │   ├── catalog
│   │   ├── checkout
│   │   ├── contact
│   │   ├── payment
│   │   ├── product
│   │   ├── sale
│   │   ├── search
│   │   └── user
│   ├── auth
│   └── api
│
├── components
├── constants
├── hooks
├── layouts
├── lib
├── middlewares
├── providers
├── services
├── store
├── styles
└── types
```

---

# 🚀 Installation

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd client
   ```

---

2. **Setup dependencies**

   ```bash
   npm install
   # hoặc
   yarn install
   # hoặc
   pnpm install
   ```

---

3. **Cấu hình biến môi trường**

   ```bash
   cp .env.example .env.local
   ```

   Chỉnh sửa file `.env.local`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   ```

---

4. **Chạy development server**

   ```bash
   npm run dev
   # hoặc
   yarn dev
   # hoặc
   pnpm dev
   ```

5. **Applications runs** tại [http://localhost:3000](http://localhost:3000)

---

# 📜 Scripts

| Command                | Description             |
| ---------------------- | ----------------------- |
| `npm run dev`          | Run development server  |
| `npm run build`        | Build production        |
| `npm run start`        | Start production server |
| `npm run lint`         | Run ESLint              |
| `npm run prettier`     | Check formatting        |
| `npm run prettier:fix` | Auto Fix formatting     |

---

# 🏗️ Architecture Highlights

- Feature-based scalable structure
- Reusable component system
- URL-driven filtering architecture
- React Query server-state management
- Zustand client-state management
- Clean separation of concerns
- Mobile-first responsive design
- Production-ready frontend structure

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                       Client                             │
│  ┌────────────────────────────────────────────────────┐  │
│  │                  Next.js App                       │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │  │
│  │  │  Pages   │  │Components│  │     Hooks        │  │  │
│  │  └────┬─────┘  └────┬─────┘  └────────┬─────────┘  │  │
│  │       │             │                 │            │  │
│  │       └─────────────┼─────────────────┘            │  │
│  │                     ▼                              │  │
│  │  ┌──────────────────────────────────────────────┐  │  │
│  │  │              Services (Axios)                │  │  │
│  │  └──────────────────────┬───────────────────────┘  │  │
│  └─────────────────────────┼──────────────────────────┘  │
│                            │                             │
└────────────────────────────┼─────────────────────────────┘
                             ▼
                    ┌─────────────────┐
                    │   Backend API   │
                    │  (Express.js)   │
                    └─────────────────┘
```

## 🔧 Development Tools

- **ESLint** - Linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Turbopack** - Fast bundling

---

# 👨‍💻 Author

Developed by **Le Minh Thien**

---

# 📄 License

This project is developed for learning, portfolio, and personal development purposes.
