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
<<<<<<< HEAD
- Address Book Management
- Vietnam Provinces API Integration
- Dynamic Address Selection:
  - Province / City
  - District
  - Ward
- Integrated Checkout Address Flow
=======
- Checkout Flow:
   - Address
   - Shipping
   - Payment
>>>>>>> 9ec2191 (fix: handle address selection with clean logic)
- MoMo Payment Integration
- Product Search & Sorting
- Product Pagination
- Infinite Loading UI
- Rating & Price Filtering
- Product Specifications Filtering

<<<<<<< HEAD

=======
>>>>>>> 9ec2191 (fix: handle address selection with clean logic)
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
<<<<<<< HEAD
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
=======
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── (main)/                  # Main route group
│   │   ├── page.tsx             # Homepage
│   │   ├── about/               # About page
│   │   ├── catalog/             # Product catalog
│   │   │   ├── page.tsx         # Catalog listing
│   │   │   └── [slug]/          # Product detail
│   │   ├── checkout/            # Checkout flow
│   │   ├── contact/             # Contact page
│   │   ├── payment/             # Payment status
│   │   ├── sale/                # Sale page
│   │   ├── search/              # Search results
│   │   └── user/                # User dashboard
│   │       ├── orders/          # Order history
│   │       ├── wishlist/        # Wishlist
│   │       └── profile/         # User profile
│   ├── auth/                    # Auth routes
│   │   ├── login/               # Login page
│   │   └── register/            # Register page
│   ├── api/                     # API routes (next/api)
│   └── [...all]/               # Catch-all 404 page
│
├── components/                  # React Components
│   ├── ui/                      # Base UI components (Shadcn/UI)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── skeleton.tsx
│   │   ├── tabs.tsx
│   │   └── ... (22 UI components)
│   │
│   ├── shared/                  # Shared/Reusable components
│   │   ├── AddressDialog.tsx    # Address management
│   │   ├── Button.tsx           # Custom button wrapper
│   │   ├── FormInput.tsx        # Form input wrapper
│   │   ├── Loading.tsx          # Loading state
│   │   ├── Pagination.tsx       # Pagination control
│   │   ├── QuantityInput.tsx    # Quantity selector
│   │   ├── Search.tsx           # Search input
│   │   ├── StarView.tsx         # Star rating display
│   │   └── ... (31 shared components)
│   │
│   ├── features/                # Feature-specific components
│   │   ├── auth/                # Auth components
│   │   │   └── LoginForm, RegisterForm, etc.
│   │   ├── cart/                # Cart feature
│   │   │   └── CartItem, CartSummary, etc.
│   │   ├── catalog/             # Product catalog
│   │   │   └── ProductList, FilterSidebar, etc.
│   │   ├── categories/          # Category components
│   │   │   └── CategoryCard, CategoryList, etc.
│   │   ├── product/             # Product detail
│   │   │   └── ProductGallery, ProductSpecs, etc.
│   │   ├── order/               # Order components
│   │   │   └── OrderList, OrderDetail, etc.
│   │   ├── profile/             # User profile
│   │   │   └── ProfileForm, AvatarUpload, etc.
│   │   ├── search-bar/          # Search feature
│   │   │   └── SearchBar, SearchHistory, etc.
│   │   ├── user/                # User components
│   │   │   └── UserMenu, UserInfo, etc.
│   │   └── wishlist/            # Wishlist feature
│   │       └── WishlistItem, WishlistIcon, etc.
│   │
│   ├── swipers/                 # Swiper carousel components
│   │   └── Custom swiper configs
│   │
│   ├── api/                     # API-related components
│   │   └── Utility components for API features
│   │
│   ├── Banner.tsx               # Banner component
│   ├── Container.tsx            # Layout container
│   └── ProductCard.tsx          # Product card display
│
├── constants/                   # Application constants
│   ├── attribute.constant.tsx   # Product attributes
│   ├── constants.ts             # General constants
│   ├── options.constant.ts      # Select options
│   └── queryKey.ts              # React Query keys
│
├── hooks/                       # Custom React Hooks (18 hooks)
│   ├── useAuth.ts               # Get auth user
│   ├── useAuthQuery.ts          # Auth mutations (register, login)
│   ├── useAddressQuery.ts       # Address CRUD
│   ├── useCartQuery.ts          # Cart operations
│   ├── useCategories.ts         # Fetch categories
│   ├── useCategory.ts           # Fetch single category
│   ├── useDebounce.ts           # Debounce hook
│   ├── useFilterProducts.ts     # Product filtering
│   ├── useGoogleLogin.ts        # Google OAuth
│   ├── useOrderQuery.ts         # Order operations
│   ├── usePaymentMomoQuery.ts   # Momo payment
│   ├── useProductsQuery.ts      # Product fetching
│   ├── useQueryString.ts        # URL query params
│   ├── useRequireAuth.ts        # Auth guard
│   ├── useSidebarToggle.ts      # Sidebar state
│   ├── useUpdateURL.ts          # URL updates
│   ├── useBuildFilterBadges.ts  # Filter badges
│   └── useWishlistQuery.ts      # Wishlist operations
│
├── layouts/                     # Layout components
│   └── Common layouts for pages
│
├── lib/                         # Utility functions & helpers
│   └── Helper functions
│
├── middlewares/                 # Custom middlewares
│   └── Route protection, logging, etc.
│
├── providers/                   # Context Providers
│   ├── QueryClientProvider      # React Query setup
│   ├── ToastProvider            # Toast notifications
│   └── Theme providers
│
├── services/                    # API Service Layer (Axios)
│   ├── auth.service.ts          # Auth APIs
│   ├── user.service.ts          # User APIs
│   ├── product.service.ts       # Product APIs
│   ├── category.service.ts      # Category APIs
│   ├── cart.service.ts          # Cart APIs
│   ├── address.service.ts       # Address APIs
│   ├── order.service.ts         # Order APIs
│   ├── wishlist.service.ts      # Wishlist APIs
│   ├── google.service.ts        # Google OAuth
│   └── payment/                 # Payment services
│       └── momo.service.ts      # Momo payment
│
├── store/                       # Zustand Stores (State Management)
│   ├── useSearchHistoryStore.ts # Search history
│   └── checkout.store.ts        # Checkout flow state
│
├── styles/                      # Global styles
│   ├── globals.css              # Tailwind + globals
│   └── Custom CSS modules
│
├── types/                       # TypeScript Interfaces & Types
│   ├── user.types.ts            # User interfaces
│   ├── product.types.ts         # Product interfaces
│   ├── order.types.ts           # Order interfaces
│   └── ... (all type definitions)
│
├── .env.local                   # Environment variables (local)
└── .env.example                 # Environment template
>>>>>>> 9ec2191 (fix: handle address selection with clean logic)
```

---

<<<<<<< HEAD
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
=======
## 📊 Component Breakdown

| Category               | Count | Examples                                                               |
| ---------------------- | ----- | ---------------------------------------------------------------------- |
| **UI Components**      | 22    | Badge, Button, Card, Dialog, Input, Select, Tabs, Skeleton...          |
| **Shared Components**  | 31    | AddressDialog, Loading, Pagination, QuantityInput, Search, StarView... |
| **Feature Components** | 50+   | LoginForm, CartItem, ProductList, FilterSidebar, OrderDetail...        |
| **Swiper Components**  | 5+    | Banner, Product carousels, Image sliders...                            |
| **Custom Hooks**       | 18    | useAuth, useCartQuery, useFilterProducts, usePaymentMomo...            |
| **Services**           | 9     | Auth, User, Product, Cart, Order, Address, Payment, Wishlist, Google   |
| **Zustand Stores**     | 2     | SearchHistoryStore, CheckoutStore                                      |

---

# 🚀 Installation

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd client
>>>>>>> 9ec2191 (fix: handle address selection with clean logic)
   ```

---

<<<<<<< HEAD
3. **Cấu hình biến môi trường**

   ```bash
=======
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
>>>>>>> 9ec2191 (fix: handle address selection with clean logic)
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

<<<<<<< HEAD
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
=======
# 🪝 Custom Hooks Guide

Our application provides 18 custom hooks for common operations:

## Authentication & User Hooks

### `useAuth()`

Get current authenticated user and check authentication status.

```typescript
const { user, isAuthenticated } = useAuth()
```

### `useAuthQuery()`

Mutations for authentication (register, login, logout, password change).

```typescript
const { register, login, logout, changePassword } = useAuthQuery()
await register({ email, password, username })
```

### `useRequireAuth()`

Protect routes - redirects to login if not authenticated.

```typescript
useRequireAuth() // Hook at component start
```

## Data Fetching Hooks

### `useProductsQuery(page, limit)`

Fetch products with pagination and caching.

```typescript
const { data, isLoading, hasNextPage, fetchNextPage } = useProductsQuery(1, 10)
```

### `useFilterProducts(filters)`

Advanced product filtering with URL sync.

```typescript
const { products, isLoading } = useFilterProducts({
   category: 'electronics',
   priceMin: 100,
   priceMax: 500,
   search: 'laptop'
})
```

### `useCategories()`

Fetch all product categories.

```typescript
const { data: categories, isLoading } = useCategories()
```

### `useCategory(slug)`

Fetch single category details.

```typescript
const { data: category } = useCategory('electronics')
```

## Cart & Wishlist Hooks

### `useCartQuery()`

Complete cart management (CRUD operations).

```typescript
const { cart, addItem, updateItem, removeItem, clearCart, isLoading } = useCartQuery()

await addItem(productId, quantity)
```

### `useWishlistQuery()`

Wishlist operations (add, remove, check).

```typescript
const { wishlist, toggleWishlist, isInWishlist, isLoading } = useWishlistQuery()

await toggleWishlist(productId)
```

## Order & Payment Hooks

### `useOrderQuery()`

Order operations (create, fetch, cancel).

```typescript
const { orders, createOrder, cancelOrder, isLoading } = useOrderQuery()

await createOrder({ addressId, paymentMethod, items })
```

### `usePaymentMomoQuery()`

Momo payment operations.

```typescript
const { createPayment, checkStatus, isLoading } = usePaymentMomoQuery()

const { paymentUrl } = await createPayment(orderId, amount)
```

## Address Hooks

### `useAddressQuery()`

User address management.

```typescript
const { addresses, createAddress, updateAddress, deleteAddress, setDefaultAddress } =
   useAddressQuery()
```

## URL & State Hooks

### `useQueryString()`

Read and update URL query parameters.

```typescript
const { getQuery, setQuery } = useQueryString()
const page = getQuery('page') // Get param
setQuery('page', '2') // Set param
```

### `useUpdateURL(filters)`

Update URL with filter parameters.

```typescript
useUpdateURL({ category: 'electronics', sort: 'price' })
```

### `useBuildFilterBadges(filters)`

Build filter badge display from filter object.

```typescript
const badges = useBuildFilterBadges(activeFilters)
```

## UI State Hooks

### `useSidebarToggle()`

Sidebar visibility state management.

```typescript
const { isOpen, toggle, close, open } = useSidebarToggle()
```

### `useDebounce(value, delay)`

Debounce values (for search input optimization).

```typescript
const debouncedSearch = useDebounce(searchInput, 300)
```

## Social Login Hooks

### `useGoogleLogin()`

Google OAuth login integration.

```typescript
const { handleGoogleLogin, isLoading } = useGoogleLogin()
```

---

# 🌐 Services Documentation

All services use **Axios** with automatic error handling and request/response interceptors.

## Auth Service (`auth.service.ts`)

```typescript
authService.register(userData) // Register new user
authService.login(email, password) // User login
authService.logout() // User logout
authService.changePassword(data) // Change password
authService.loginGoogle(token) // Google OAuth login
```

## User Service (`user.service.ts`)

```typescript
userService.getMe() // Get current user profile
userService.updateMe(data) // Update profile
userService.updateProfileWithAvatar(file) // Upload avatar
```

## Product Service (`product.service.ts`)

```typescript
productService.getProducts(page, limit) // Get paginated products
productService.filterProducts(filters) // Advanced filtering
productService.getProductBySlug(slug) // Get product detail
productService.createProduct(data) // Create (admin)
productService.updateProduct(id, data) // Update (admin)
productService.deleteProduct(id) // Delete (admin)
```

## Category Service (`category.service.ts`)

```typescript
categoryService.getAll() // Get all categories
categoryService.getBySlug(slug) // Get category detail
```

## Cart Service (`cart.service.ts`)

```typescript
cartService.getCart() // Get user cart
cartService.addItem(productId, qty) // Add to cart
cartService.updateItem(itemId, qty) // Update quantity
cartService.removeItem(itemId) // Remove from cart
cartService.clearCart() // Clear entire cart
```

## Order Service (`order.service.ts`)

```typescript
orderService.createOrder(data) // Create new order
orderService.getOrders() // Get user orders
orderService.getOrderDetail(id) // Get order detail
orderService.cancelOrder(id) // Cancel order
```

## Address Service (`address.service.ts`)

```typescript
addressService.getMyAddresses() // Get all addresses
addressService.createAddress(data) // Create address
addressService.updateAddress(id, data) // Update address
addressService.deleteAddress(id) // Delete address
addressService.setDefaultAddress(id) // Set as default
```

## Wishlist Service (`wishlist.service.ts`)

```typescript
wishlistService.getWishlist() // Get wishlist
wishlistService.toggleWishlist(productId) // Add/remove
wishlistService.isInWishlist(productId) // Check status
```

## Payment Service (`payment/momo.service.ts`)

```typescript
momoService.createPayment(orderId, amount) // Initiate payment
momoService.checkStatus(transactionId) // Check payment status
```

## Google Service (`google.service.ts`)

```typescript
googleService.verifyToken(token) // Verify Google token
googleService.login(token) // Perform Google login
```

---

# 📦 State Management (Zustand)

## SearchHistoryStore

Persists search history to localStorage (max 10 items).

```typescript
import { useSearchHistoryStore } from '@/store/useSearchHistoryStore'

const { history, addSearch, removeSearch, clearHistory } = useSearchHistoryStore()

// Add search to history
addSearch('laptop')

// Get history
console.log(history) // ['laptop', 'phone', ...]

// Remove specific search
removeSearch('laptop')

// Clear all history
clearHistory()
```

## CheckoutStore

Manages checkout flow state (address, shipping, payment info).

```typescript
import { useCheckoutStore } from '@/store/checkout.store'

const { address, shipping, paymentMethod, setAddress, setShipping, setPaymentMethod, reset } =
   useCheckoutStore()

// Update checkout state
setAddress(selectedAddress)
setPaymentMethod('momo')

// Complete checkout
reset() // Clear state after order
```

---

# 🎨 Styling & Component Patterns

## Tailwind CSS Configuration

- **Responsive breakpoints** with mobile-first approach
- **Dark mode support** (if configured)
- **Custom color scheme** for brand consistency
- **Utility-first workflow** for rapid development

## UI Component Conventions

All UI components from `shadcn/ui` are imported from `components/ui`:

```typescript
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
```

## Shared Component Usage

Reusable components provide project-specific wrapping:

```typescript
import { FormInput } from '@/components/shared/FormInput'
import { QuantityInput } from '@/components/shared/QuantityInput'
import { Pagination } from '@/components/shared/Pagination'
```

## Component Composition Pattern

```typescript
export function ProductCard({ product }: Props) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition">
      <div className="aspect-square overflow-hidden">
        <Image src={product.image} alt={product.name} />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold line-clamp-2">{product.name}</h3>
        <p className="text-lg font-bold text-primary mt-2">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  )
}
```

---

# 🔌 API Integration Pattern

All components follow a consistent data fetching pattern:

## Using React Query Hook

```typescript
function CatalogPage() {
  const { products, isLoading, error } = useProductsQuery(1, 10)

  if (isLoading) return <SkeletonLoader />
  if (error) return <ErrorCard />

  return (
    <div>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
```

## Using Mutation Hook

```typescript
function AddToCart() {
  const { addItem, isLoading } = useCartQuery()

  const handleAdd = async () => {
    try {
      await addItem(productId, quantity)
      toast.success('Added to cart')
    } catch (err) {
      toast.error('Failed to add to cart')
    }
  }

  return <Button onClick={handleAdd} disabled={isLoading}>Add to Cart</Button>
}
```

---

# 🛣️ Routing Structure

The application uses Next.js App Router with grouped routes:

```
/                          → Homepage
/catalog                   → Product catalog with filtering
/catalog/[slug]            → Product detail page
/search?q=keyword          → Search results (URL-driven)
/checkout                  → Checkout flow
/payment                   → Payment result page
/user/profile              → User profile
/user/orders               → Order history
/user/wishlist             → Wishlist
/auth/login                → Login page
/auth/register             → Registration page
/about                     → About page
/contact                   → Contact page
/sale                      → Sale/promotional page
```

---

# 🔐 Protected Routes

Use `useRequireAuth()` hook to protect pages:

```typescript
'use client'

import { useRequireAuth } from '@/hooks/useRequireAuth'

export default function ProfilePage() {
  useRequireAuth() // Redirects to login if not authenticated

  return <div>User Profile Content</div>
}
```

---

# 🌟 Best Practices

## 1. Component Organization

- Keep components small and focused
- Use feature-based folder structure
- Extract reusable components to `shared/`

## 2. Data Fetching

- Always use custom hooks instead of direct API calls
- Leverage React Query caching
- Handle loading and error states

## 3. State Management

- Use Zustand for UI state (sidebar, modals, etc.)
- Use React Query for server state (data)
- Use Context API for theme/auth if needed

## 4. Type Safety

- Define types for all API responses in `types/`
- Use TypeScript strict mode
- Avoid `any` type usage

## 5. URL-Driven State

- Sync filters with URL query parameters
- Use `useQueryString()` for URL operations
- Preserve filters on page refresh

## 6. Performance

- Use `next/image` for image optimization
- Implement skeleton loading for better UX
- Debounce search inputs (see `useDebounce`)
- Lazy load components with `React.lazy()`

## 7. Error Handling

- Always handle API errors with try-catch
- Show user-friendly error messages
- Log errors for debugging

## 8. Form Handling

- Use React Hook Form with Zod validation
- Create reusable form components
- Validate on change for better UX

## 9. Accessibility

- Use semantic HTML
- Include ARIA labels where needed
- Test keyboard navigation

## 10. Code Quality

- Run ESLint regularly: `npm run lint`
- Format code with Prettier: `npm run prettier:fix`
- Write meaningful commit messages

---

# 🚀 Development Workflow

## 1. Starting Development

```bash
# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Run development server
npm run dev

# Visit http://localhost:3000
```

## 2. Creating a New Feature

```bash
# 1. Create page in src/app/(main)/[feature]/
# 2. Create feature components in src/components/features/[feature]/
# 3. Create custom hook if needed in src/hooks/
# 4. Create service if needed in src/services/
# 5. Define types in src/types/
# 6. Add constants if needed in src/constants/
```

## 3. Code Quality Checks

```bash
# Lint code
npm run lint

# Format code
npm run prettier:fix

# Build check
npm run build
```

## 4. Building for Production

```bash
# Build optimized bundle
npm run build

# Test production build locally
npm run start

# Visit http://localhost:3000
```

---

# 🔧 Environment Variables

Create `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_API_TIMEOUT=10000

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# Optional: Analytics, etc.
# NEXT_PUBLIC_GA_ID=...
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to browser.

---

# 📊 Performance Metrics

### Optimizations Implemented

- ✅ Image optimization with Next.js Image
- ✅ Code splitting with dynamic imports
- ✅ React Query caching strategy
- ✅ Skeleton loading for better perceived performance
- ✅ Infinite scroll vs pagination
- ✅ Turbopack for faster builds
- ✅ TypeScript strict mode

### Web Vitals

Monitor and improve Core Web Vitals:

- **LCP** (Largest Contentful Paint) < 2.5s
- **FID** (First Input Delay) < 100ms
- **CLS** (Cumulative Layout Shift) < 0.1

---

# 🧪 Testing Recommendations

While tests aren't implemented, here's the recommended setup:

```bash
# Install testing libraries
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Create tests alongside components
# src/components/Button.test.tsx
```

---

# 📱 Responsive Design

All components are mobile-first with breakpoints:

```typescript
// Tailwind breakpoints
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px

// Example usage
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* Responsive grid */}
</div>
```

---

# � Code Examples

## Complete Feature Implementation Example

### Creating a Wishlist Feature Component

```typescript
'use client'

import { Heart } from 'lucide-react'
import { useWishlistQuery } from '@/hooks/useWishlistQuery'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

interface WishlistButtonProps {
  productId: number
}

export function WishlistButton({ productId }: WishlistButtonProps) {
  const { toggleWishlist, isInWishlist, isLoading } = useWishlistQuery()

  const handleToggle = async () => {
    try {
      await toggleWishlist(productId)
      const inWishlist = isInWishlist(productId)
      toast.success(
        inWishlist ? 'Added to wishlist' : 'Removed from wishlist'
      )
    } catch (error) {
      toast.error('Failed to update wishlist')
    }
  }

  const isFavorited = isInWishlist(productId)

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      disabled={isLoading}
      className={isFavorited ? 'text-red-500' : ''}
    >
      <Heart className={isFavorited ? 'fill-current' : ''} />
    </Button>
  )
}
```

## Product Filtering with URL Sync

```typescript
'use client'

import { useFilterProducts } from '@/hooks/useFilterProducts'
import { useUpdateURL } from '@/hooks/useUpdateURL'
import { ProductCard } from '@/components/ProductCard'

interface CatalogFilters {
  category?: string
  priceMin?: number
  priceMax?: number
  search?: string
  sort?: 'price' | 'rating'
}

export function CatalogPage({ searchParams }: { searchParams: CatalogFilters }) {
  const { products, isLoading } = useFilterProducts(searchParams)
  const updateURL = useUpdateURL(searchParams)

  const handleFilterChange = (newFilters: Partial<CatalogFilters>) => {
    updateURL(newFilters) // Updates URL and filters products
  }

  return (
    <div className="flex gap-8">
      {/* Filter Sidebar */}
      <aside className="w-64">
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="1000"
            onChange={(e) => handleFilterChange({ priceMax: Number(e.target.value) })}
          />
          {/* More filters... */}
        </div>
      </aside>

      {/* Products Grid */}
      <main className="flex-1">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
```

## Cart Operations with React Query

```typescript
'use client'

import { useCartQuery } from '@/hooks/useCartQuery'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

export function CartPage() {
  const { cart, addItem, updateItem, removeItem, clearCart, isLoading } = useCartQuery()

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItem(itemId)
      return
    }
    try {
      await updateItem(itemId, newQuantity)
      toast.success('Quantity updated')
    } catch (error) {
      toast.error('Failed to update quantity')
    }
  }

  const handleCheckout = async () => {
    if (!cart?.items?.length) {
      toast.error('Cart is empty')
      return
    }
    // Navigate to checkout
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {!cart?.items?.length ? (
        <div className="text-center py-12">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, Number(e.target.value))
                  }
                  className="w-16 border rounded px-2 py-1"
                />

                <Button
                  variant="destructive"
                  onClick={() => removeItem(item.id)}
                  disabled={isLoading}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <div className="text-xl font-bold">
              Total: ${cart.total?.toFixed(2)}
            </div>
            <div className="space-x-4">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button onClick={handleCheckout} disabled={isLoading}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
```

## Checkout Flow with Zustand Store

```typescript
'use client'

import { useCheckoutStore } from '@/store/checkout.store'
import { useOrderQuery } from '@/hooks/useOrderQuery'
import { useAddressQuery } from '@/hooks/useAddressQuery'

export function CheckoutPage() {
  const { address, paymentMethod, setAddress, setPaymentMethod } = useCheckoutStore()
  const { createOrder, isLoading } = useOrderQuery()
  const { addresses } = useAddressQuery()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!address) {
      toast.error('Please select an address')
      return
    }

    try {
      const order = await createOrder({
        addressId: address.id,
        paymentMethod: paymentMethod || 'momo',
        items: [] // Cart items
      })

      toast.success('Order created successfully')
      useCheckoutStore.setState({ address: null, paymentMethod: null })
      // Navigate to payment page
    } catch (error) {
      toast.error('Failed to create order')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto py-8">
      {/* Address Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
        <div className="space-y-4">
          {addresses?.map((addr) => (
            <label key={addr.id} className="flex items-center gap-3 border p-4 rounded">
              <input
                type="radio"
                checked={address?.id === addr.id}
                onChange={() => setAddress(addr)}
              />
              <div>
                <p className="font-semibold">{addr.fullName}</p>
                <p className="text-gray-600">{addr.street}, {addr.city}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
        <div className="space-y-3">
          {['momo', 'card', 'bank'].map((method) => (
            <label key={method} className="flex items-center gap-3">
              <input
                type="radio"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="capitalize">{method}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !address}
        className="w-full bg-blue-600 text-white py-3 rounded font-semibold"
      >
        {isLoading ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  )
}
```

---

# 🐛 Troubleshooting

## Common Issues & Solutions

### Issue: CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**

- Check `NEXT_PUBLIC_API_URL` is correct
- Ensure backend has CORS enabled for your frontend origin
- Check backend `.env` for `ALLOWED_ORIGINS`

### Issue: 401 Unauthorized on Protected Routes

**Error:** `Unauthorized - Session expired`

**Solution:**

- Check if cookies are being sent with requests
- Verify JWT refresh token logic
- Clear browser cookies and re-login
- Check if `withCredentials: true` in Axios config

### Issue: Images Not Loading

**Error:** `Image 404 or Error`

**Solution:**

- Verify image hostname is in `next.config.ts` remotePatterns
- Check image URL is valid
- Ensure Cloudinary credentials are correct

### Issue: Build Fails

**Error:** `Build failed - TypeScript errors`

**Solution:**

```bash
# Check all type errors
npx tsc --noEmit

# Fix import paths
# Ensure all imports use correct @ aliases
```

### Issue: Environment Variables Not Loading

**Error:** `process.env.NEXT_PUBLIC_API_URL is undefined`

**Solution:**

- Create `.env.local` (not `.env`)
- Restart dev server after adding env vars
- Use `NEXT_PUBLIC_` prefix for browser variables
- Rebuild after env changes

---

# 📚 Additional Resources

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TanStack Query (React Query)](https://tanstack.com/query/latest)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/UI](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Tools

- [VS Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/) - API Testing
- [React DevTools](https://react-devtools-tutorial.vercel.app/)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools) - For state debugging

---

# 🎯 Quick Reference

## File Location Quick Guide

| Need              | Location                                |
| ----------------- | --------------------------------------- |
| Create new page   | `src/app/(main)/[feature]/`             |
| Create component  | `src/components/features/[feature]/`    |
| Create hook       | `src/hooks/use[Feature].ts`             |
| Add API service   | `src/services/[feature].service.ts`     |
| Define types      | `src/types/[feature].types.ts`          |
| Add constants     | `src/constants/[feature].constant.ts`   |
| UI components     | `src/components/ui/[component].tsx`     |
| Shared components | `src/components/shared/[Component].tsx` |
| Global state      | `src/store/use[Feature]Store.ts`        |

## Command Quick Reference

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Run production build
npm run lint             # Check code quality
npm run prettier:fix     # Auto format code
npm run type-check       # TypeScript check
```

## Keyboard Shortcuts

| Action              | Shortcut           |
| ------------------- | ------------------ |
| Format document     | `Shift + Alt + F`  |
| Quick fix           | `Ctrl + .`         |
| Go to definition    | `F12`              |
| Find all references | `Ctrl + Shift + F` |
| Rename symbol       | `F2`               |
| Comment line        | `Ctrl + /`         |

---

# 🚀 Performance Checklist

- [ ] Images optimized with Next.js Image
- [ ] Unused dependencies removed
- [ ] Code splitting implemented
- [ ] React Query caching configured
- [ ] Infinite scroll vs pagination optimized
- [ ] Lighthouse score > 90
- [ ] Bundle size analyzed
- [ ] TypeScript strict mode enabled
- [ ] ESLint no warnings
- [ ] No console errors in production

---

# 👥 Contributing Guidelines

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Follow Code Style**
   - Run `npm run prettier:fix` before committing
   - Follow TypeScript best practices
   - Use meaningful variable names

3. **Component Guidelines**
   - One component per file
   - Export types alongside components
   - Use composition over props drilling
   - Add JSDoc comments for complex logic

4. **Commit Messages**

   ```
   feat: Add wishlist toggle button
   fix: Resolve cart total calculation
   refactor: Simplify filter logic
   docs: Update README with examples
   ```

5. **Pull Request**
   - Describe changes clearly
   - Reference related issues
   - Ensure all checks pass
   - Request review from team

---

# 📞 Support & Contact

For questions or issues:

- Create an issue in the repository
- Contact the development team
- Check existing documentation first

---

# 🏆 Credits

Built with ❤️ using modern web technologies.

**Frontend Architecture & Best Practices by:** Development Team
**UI Components:** Shadcn/UI, Radix UI
**Styling:** Tailwind CSS
**Icons:** Lucide React
>>>>>>> 9ec2191 (fix: handle address selection with clean logic)

---

# 📄 License

This project is developed for learning, portfolio, and personal development purposes.
<<<<<<< HEAD
=======

**Version:** 1.0.0  
**Last Updated:** May 2026  
**Status:** Active Development

# 👨‍💻 Author

Developed by **Le Minh Thien**
>>>>>>> 9ec2191 (fix: handle address selection with clean logic)
