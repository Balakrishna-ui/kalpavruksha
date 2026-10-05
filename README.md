# Kalpavruksha Cooperative Ecosystem

> **Comprehensive Technical & Architectural Documentation**  
> *Written for software engineers, interviewers, and team members seeking a complete, zero-assumption understanding of the codebase.*

---

## Table of Contents
1. [Project Overview](#1-project-overview)
   - [Business Perspective](#business-perspective)
   - [Technical Perspective](#technical-perspective)
   - [Key Business Modules](#key-business-modules)
   - [User Capabilities vs. Admin Capabilities](#user-capabilities-vs-admin-capabilities)
2. [Technology Stack](#2-technology-stack)
   - [Programming Languages](#programming-languages)
   - [Frontend Technologies](#frontend-technologies)
   - [Backend Technologies](#backend-technologies)
   - [Database & ORM](#database--orm)
   - [Authentication & Session Flow](#authentication--session-flow)
   - [Validation Strategy](#validation-strategy)
   - [Security Architecture](#security-architecture)
3. [Fullstack Architecture & Data Flow](#3-fullstack-architecture--data-flow)
   - [High-Level Architecture Diagram](#high-level-architecture-diagram)
   - [End-to-End Request/Response Lifecycle](#end-to-end-requestresponse-lifecycle)
4. [Complete Folder Structure](#4-complete-folder-structure)
   - [Repository Layout](#repository-layout)
   - [Directory Breakdown & Responsibilities](#directory-breakdown--responsibilities)
5. [Database Schema & Models](#5-database-schema--models)
   - [Data Models Breakdown](#data-models-breakdown)
   - [Sensitive Data Encryption (AES-256-GCM)](#sensitive-data-encryption-aes-256-gcm)
6. [Detailed Code Explanations of Core Files](#6-detailed-code-explanations-of-core-files)
   - [1. Backend Entry (`backend/src/server.ts` & `backend/src/app.ts`)](#1-backend-entry-backendsrcserverts--backendsrcappts)
   - [2. Authentication Middleware (`backend/src/middleware/auth.middleware.ts`)](#2-authentication-middleware-backendsrcmiddlewareauthmiddlewarets)
   - [3. Encryption Utility (`backend/src/utils/crypto.ts`)](#3-encryption-utility-backendsrcutilscryptots)
   - [4. Upload Security Middleware (`backend/src/middleware/upload.middleware.ts`)](#4-upload-security-middleware-backendsrcmiddlewareuploadmiddlewarets)
   - [5. Membership Controller & Service (`membership.controller.ts` & `membership.service.ts`)](#5-membership-controller--service-membershipcontrollerts--membershipservicets)
   - [6. Frontend API Client (`frontend/src/api/index.js`)](#6-frontend-api-client-frontendsrcapiindexjs)
   - [7. Frontend Route & App Architecture (`frontend/src/App.tsx`)](#7-frontend-route--app-architecture-frontendsrcapptsx)
   - [8. Protected Admin Route & Auth Context (`ProtectedAdminRoute.tsx` & `AdminAuthContext.tsx`)](#8-protected-admin-route--auth-context-protectedadminroutetx--adminauthcontexttsx)
   - [9. Loan EMI Calculator (`frontend/src/components/EmiCalculator.jsx`)](#9-loan-emi-calculator-frontendsrccomponentsemicalculatorjsx)
7. [Environment Configuration & Deployment](#7-environment-configuration--deployment)
8. [Common Interview Questions & Model Answers](#8-common-interview-questions--model-answers)

---

## 1. Project Overview

### Business Perspective
**Kalpavruksha Multi-Purpose Cooperative Society Ltd.** is a registered cooperative enterprise operating in India (headquartered in Telangana). Its mission is to empower rural farmers, artisans, small entrepreneurs, and local communities through cooperative economics.

#### Problems Solved:
1. **Financial Inclusion**: Rural communities often lack access to transparent micro-loans and systematic savings programs (such as the Kalpavruksha Thrift & Investment Plan - K-TIP).
2. **Elimination of Middlemen**: Direct marketing of organic farmer produce (honey, desi grains, fruits, vegetables) directly to consumers.
3. **Paperless Member Onboarding**: Cooperative societies traditionally require extensive physical paperwork and manual identity verification. The digital platform provides a multi-step digital membership registration pipeline with KYC document verification.
4. **Transparent Governance**: Society members and regulatory authorities require strict audit trails, verified memberships, and exportable reports.

---

### Technical Perspective
From a technical point of view, Kalpavruksha is a **decoupled fullstack web application**:
- A **Single Page Application (SPA)** frontend built with **React 18**, **Vite 5**, and **Tailwind CSS**.
- A **RESTful API backend** built with **Node.js**, **Express**, and **TypeScript**.
- A cloud **MySQL** database managed via **Prisma ORM**.
- Secure banking-grade cryptography using **AES-256-GCM** authenticated encryption for sensitive personally identifiable information (Aadhaar number, PAN number, Bank account details).
- Multi-layer defense including HTTP-only cookies, JWT verification, rate limiting, and private static file gating.

---

### Key Business Modules
1. **Membership & KYC Portal (`/membership`)**:
   - 4-step wizard: Personal Info, Address Details, KYC & Banking, Nominee & Introducer details.
   - Document upload: Passport photograph, Aadhaar card, PAN card, address proof, and signature.
   - K-TIP (Kalpavruksha Thrift & Investment Plan) integration with automated fee-waiver checks for existing members.
2. **Financial Services & Loan EMI Calculator (`/divisions/finance`, Homepage)**:
   - Interactive loan calculator with flexible tenure (12 to 60 months) and interest rates (10% to 18%).
   - Real-time loan range selection from ₹5,000 to ₹5,00,000 with Indian currency formatting (`en-IN`).
   - Investment and thrift scheme inquiry capture.
3. **Cooperative Divisions**:
   - **Agriculture (`/divisions/agriculture`)**: Sustainable farming, farmer-producer organizations, organic certification.
   - **Education (`/divisions/education`)**: Skill development courses, youth training programs, and education inquiries.
   - **Manufacturing (`/divisions/manufacturing`)**: Rural value-addition and agro-processing.
   - **Trading & Consultancy (`/services/cooperative-trading-services`, `/services/business-consultancy`)**: Business advisory, rural enterprise setup.
4. **Admin Dashboard (`/admin`)**:
   - Overview metrics: Total members, KYC pending, approved applications, total deposits, leads.
   - Application Review: Individual document preview, status transitions (`PENDING`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`), rejection notes.
   - Lead & Inquiry Management: Financial, Education, Trading, and General contact leads.
   - Data Export: Sanitized CSV generation for accounting and reporting.

---

### User Capabilities vs. Admin Capabilities

| Feature | Public User | Society Administrator |
| :--- | :--- | :--- |
| Browse Divisions, Products, Projects | ✅ Yes | ✅ Yes |
| Calculate Loan EMI (₹5,000 – ₹5,00,000) | ✅ Yes | ✅ Yes |
| Submit Membership Application & KYC Documents | ✅ Yes | ✅ Can manually register/assist |
| Check Existing Member Status | ✅ Yes (by Phone/Member ID) | ✅ Yes (Full search across all fields) |
| Submit Inquiries (Finance, Service, Education, Trade) | ✅ Yes | ✅ Review, status update, delete |
| View Unencrypted Aadhaar / PAN / Bank Details | ❌ Never | ✅ Decrypted on-demand with admin credentials |
| Download Member KYC Proof Files | ❌ Blocked by static gate | ✅ Authenticated download endpoint |
| Approve / Reject / Request More Documents | ❌ No | ✅ Full workflow control |
| Export Data to CSV | ❌ No | ✅ Sanitized CSV exports |

---

## 2. Technology Stack

### Programming Languages
- **TypeScript (`v5.3.3` on Backend, `v5.2.2` on Frontend)**:
  - *Where*: Core backend controllers, services, middleware, models, and frontend router/components.
  - *Why*: Eliminates entire classes of runtime errors through strict compile-time type verification, typed database interfaces via Prisma, and structured request/response types.
- **JavaScript (ES Modules / JSX)**:
  - *Where*: Migrated frontend pages and utilities (`.jsx` and `.js`).
  - *Why*: Native modern browser compatibility and interoperability with React ecosystem libraries.

---

### Frontend Technologies

| Technology | Version | Location / Purpose | Why Used |
| :--- | :--- | :--- | :--- |
| **React** | `^18.2.0` | `frontend/src/` | Component-based declarative UI library; handles virtual DOM diffing and state lifecycle. |
| **Vite** | `^5.1.4` | `frontend/vite.config.js` | High-speed frontend build tool and local dev server using native ES modules and Rollup. |
| **React Router DOM** | `^6.22.0` | `frontend/src/App.tsx` | Client-side routing with nested layouts, lazy loading, and route protection. |
| **Tailwind CSS** | `^3.4.1` | `frontend/tailwind.config.js` | Utility-first CSS framework providing responsive design and consistent spacing/typography. |
| **Framer Motion** | `^12.38.0` | `frontend/src/components/` | Physics-based animations, modal transitions, and smooth UI reveals. |
| **Lucide React** | `^0.344.0` | `frontend/src/` | Lightweight, scalable vector icons used across the entire design system. |
| **XLSX** | `^0.18.5` | `frontend/src/pages_migrated/` | In-browser Excel parsing and generation for client-side data inspection. |
| **Canvas Confetti** | `^1.9.4` | `Membership.jsx` | Celebratory visual confetti upon successful membership registration submission. |
| **React Helmet Async** | `^3.0.0` | `frontend/src/components/common/SEO.jsx` | Dynamic document `<head>` management for OpenGraph tags and search engine optimization. |

---

### Backend Technologies

| Technology | Version | Location / Purpose | Why Used |
| :--- | :--- | :--- | :--- |
| **Node.js** | `>=18.x` | Runtime Environment | High-performance, event-driven, non-blocking asynchronous server environment. |
| **Express** | `^4.18.2` | `backend/src/app.ts` | Minimalist web framework for routing, request middleware, and REST API controllers. |
| **Prisma ORM** | `^6.0.0` | `backend/prisma/` | Next-generation type-safe ORM connecting to MySQL, handling migrations and queries. |
| **Bcryptjs** | `^3.0.3` | `backend/src/services/auth.service.ts` | Cryptographic salt-and-hash algorithm for admin password storage. |
| **Jsonwebtoken (JWT)** | `^9.0.3` | `backend/src/utils/jwt.ts` | Stateless cryptographically signed tokens carrying admin identity claims. |
| **Multer** | `^2.2.0` | `backend/src/middleware/upload.middleware.ts` | Multipart form-data parser handling secure file uploads directly to local disk. |
| **Helmet** | `^7.1.0` | `backend/src/app.ts` | Sets secure HTTP response headers (X-DNS-Prefetch-Control, X-Content-Type-Options, etc.). |
| **Express Rate Limit**| `^8.5.1` | `backend/src/middleware/rate-limit.middleware.ts` | Protects endpoints against denial-of-service (DoS) and brute-force password guessing. |
| **Cookie Parser** | `^1.4.7` | `backend/src/app.ts` | Parses signed and unsigned cookies from request headers into `req.cookies`. |
| **Nodemailer** | `^8.0.8` | `backend/src/config/mail.ts` | SMTP email transport used for delivering password-reset One-Time Passwords (OTPs). |

---

### Database & ORM
- **Database**: Cloud MySQL (hosted on Hostinger production servers: `srv2205.hstgr.io:3306`).
- **ORM**: Prisma ORM with MySQL driver.
- **Connection Management**:
  - Connection pooling via `DATABASE_URL` connection strings.
  - Singleton Prisma client instance in [backend/src/config/database.ts](file:///c:/Users/LENOVO/Desktop/kalpavruksha/backend/src/config/database.ts) to prevent connection leaks during server reloads.

---

### Authentication & Session Flow
The admin dashboard uses a secure, modern **dual-channel authentication mechanism**:

```
[ Admin Browser ]                             [ Backend Server ]                      [ MySQL Database ]
       |                                              |                                       |
1. POST /api/admin/auth/login                         |                                       |
   { email, password } -----------------------------> |                                       |
       |                                              |-- 2. Find admin by email -----------> |
       |                                              |   SELECT * FROM AdminUser WHERE email |
       |                                              | <------------------------------------ |
       |                                              |-- 3. Verify bcrypt.compare(pass, hash)|
       |                                              |-- 4. Sign JWT { id, email, role }     |
       |                                              |-- 5. Set-Cookie: admin_session=JWT    |
       | <--------------------------------------------|      (HttpOnly, Secure, SameSite)     |
       |   Response: { authenticated: true, token }   |                                       |
       |                                              |                                       |
       |                                              |                                       |
6. Subsequent Requests (e.g. GET /api/members)        |                                       |
   Cookie: admin_session=JWT                          |                                       |
   OR Authorization: Bearer <token> ----------------> |-- 7. requireAdmin middleware checks:  |
       |                                              |      a) Extract token from cookie/hdr |
       |                                              |      b) jwt.verify(token, JWT_SECRET) |
       |                                              |      c) Verify admin is active -----> |
       |                                              | <------------------------------------ |
       | <--------------------------------------------|-- 8. Return protected payload         |
```

1. **Login Request**: Admin submits credentials to `/api/admin/auth/login`.
2. **Credential Validation**: `AuthService.validateAdmin` queries `AdminUser`.
3. **Password Verification**: `bcrypt.compare` checks the plaintext password against the stored bcrypt hash.
4. **Token Generation**: Generates a JWT signed with `JWT_SECRET` (12-hour expiration).
5. **Session Delivery**:
   - Writes an `HttpOnly`, `Secure`, `SameSite` cookie named `admin_session`.
   - Returns `{ token, admin }` in JSON so client-side JavaScript can store a fallback in `localStorage` for cross-origin or export scenarios.
6. **Authorization Check (`requireAdmin`)**:
   - Inspects `req.cookies.admin_session`, `req.headers.authorization` (`Bearer <token>`), and query parameter `?token=` (for browser file downloads).
   - Verifies the signature and decodes the payload.
   - Confirms `admin.isActive === true` directly in the database.
   - Attaches `req.admin` to the request pipeline.
7. **Logout**: `/api/admin/auth/logout` clears the cookie and frontend drops `admin_token` from `localStorage`.

---

### Validation Strategy
1. **Frontend Validation**:
   - Immediate feedback on required inputs, 10-digit mobile number formatting, valid email syntax, and file size constraints (max 5 MB).
   - Prevents invalid form submissions before making network calls.
2. **Backend Validation ([backend/src/validators/common.validator.ts](file:///c:/Users/LENOVO/Desktop/kalpavruksha/backend/src/validators/common.validator.ts))**:
   - `requireFields(fields[])`: Enforces presence of mandatory body parameters.
   - `validatePhone(fieldName)`: Enforces exact 10-digit Indian phone number regex (`/^\d{10}$/`).
   - `validateEmail(fieldName)`: Enforces standard email syntax regex.
   - `inputSanitizer(options)`: Strips raw HTML tags (`/<[^>]*>?/gm`) to prevent stored Cross-Site Scripting (XSS) and enforces character length limits.
3. **File Upload Validation ([backend/src/middleware/upload.middleware.ts](file:///c:/Users/LENOVO/Desktop/kalpavruksha/backend/src/middleware/upload.middleware.ts))**:
   - Strict MIME-type filter allowing only `image/jpeg`, `image/png`, `image/webp`, and `application/pdf`.
   - 5 MB maximum file size limit enforced by Multer.

---

### Security Architecture

| Security Mechanism | What It Is | Why It Is Needed | How It Is Implemented | Where Implemented |
| :--- | :--- | :--- | :--- | :--- |
| **AES-256-GCM Encryption** | Authenticated symmetric cipher with unique IV per record. | Protects government identity numbers (Aadhaar, PAN, Bank Accounts) in the event of a raw database breach. | Pre-save encryption hook converts text into `iv:ciphertext:authTag`. On authorized retrieval, it decrypts on-the-fly. | [backend/src/utils/crypto.ts](file:///c:/Users/LENOVO/Desktop/kalpavruksha/backend/src/utils/crypto.ts) |
| **Sensitive Static File Gating** | Express route guard blocking public access to KYC uploads. | Prevents unauthenticated users from guessing file URLs and downloading identity proofs. | Regex checks filename for `(photo\|aadhaar\|pan\|addressProof\|signature)-` and blocks direct access with a 403 Forbidden. Files are only accessible via authenticated `/admin/members/:id/documents/:docId`. | [backend/src/middleware/upload.middleware.ts](file:///c:/Users/LENOVO/Desktop/kalpavruksha/backend/src/middleware/upload.middleware.ts) |
| **Multi-Tier Rate Limiting** | Dynamic IP request throttler. | Prevents DDoS, brute-force admin logins, and form spam. | Three tiers: 1) General API (100 req/15 min), 2) Auth attempts (5 req/15 min), 3) Form submissions (10 req/hour). | [backend/src/middleware/rate-limit.middleware.ts](file:///c:/Users/LENOVO/Desktop/kalpavruksha/backend/src/middleware/rate-limit.middleware.ts) |
| **Parameterized SQL Queries** | Prepared SQL statement execution. | Completely prevents SQL Injection attacks. | Prisma ORM automatically parameterizes all queries; no raw string concatenation is used. | [backend/src/services/](file:///c:/Users/LENOVO/Desktop/kalpavruksha/backend/src/services/) |
| **Bcrypt Password Hashing** | One-way cryptographic adaptive hashing with salt. | Ensures passwords cannot be reversed even if the database is exposed. | `bcrypt.hash` with standard cost factor; verified using `bcrypt.compare`. | [backend/src/services/auth.service.ts](file:///c:/Users/LENOVO/Desktop/kalpavruksha/backend/src/services/auth.service.ts) |
| **CORS Restriction** | Cross-Origin Resource Sharing whitelist. | Prevents malicious external websites from making unauthorized requests on behalf of users. | Whitelist strictly validates origin against allowed local and production domains (`kalpavruksha.co.in`, `localhost:5000`, etc.). | [backend/src/config/cors.ts](file:///c:/Users/LENOVO/Desktop/kalpavruksha/backend/src/config/cors.ts) |
| **XSS Input Sanitization** | Automatic HTML tag stripping. | Prevents Cross-Site Scripting attacks where malicious `<script>` tags are submitted via forms. | Regex sanitizes all string fields in request bodies before they reach controllers. | [backend/src/validators/common.validator.ts](file:///c:/Users/LENOVO/Desktop/kalpavruksha/backend/src/validators/common.validator.ts) |

---

## 3. Fullstack Architecture & Data Flow

### High-Level Architecture Diagram

```
+-------------------------------------------------------------------------------+
|                                CLIENT BROWSER                                 |
|                                                                               |
|  [ Public Pages ]               [ Admin Pages ]            [ Shared State ]   |
|  - Home (Hero, EMI Calc)        - Overview / Analytics     - AdminAuthContext |
|  - Divisions & Products         - Members & KYC Review     - Vite Proxy       |
|  - Membership & K-TIP Form      - Enquiries & Reports      - React Router     |
+-------------------------------------------------------------------------------+
                                      |
                                      | HTTP Requests (JSON / FormData)
                                      v
+-------------------------------------------------------------------------------+
|                          EXPRESS BACKEND PIPELINE                             |
|                                                                               |
|  [1. Helmet Security Headers] -> [2. CORS Whitelist] -> [3. Body Parser (50kb)]|
|                                      |                                        |
|  [4. Rate Limiter (IP Window)] -> [5. File Upload & Sensitive File Blocker]   |
|                                      |                                        |
|                     [6. Express Routing Layer (/api)]                         |
|    +-------------------+--------------------+--------------------+            |
|    | /auth             | /membership        | /financial-enquiry | ...        |
|    +-------------------+--------------------+--------------------+            |
|              |                    |                    |                      |
|  [7. requireAdmin Auth]           |                    |                      |
|              v                    v                    v                      |
|  +-------------------------------------------------------------------------+  |
|  |                           CONTROLLERS LAYER                             |  |
|  |  - AuthController          - MembershipController   - FinancialController| |
|  +-------------------------------------------------------------------------+  |
|                                      |                                        |
|                                      v                                        |
|  +-------------------------------------------------------------------------+  |
|  |                            SERVICES LAYER                               |  |
|  |  - AuthService             - MembershipService      - FinancialService  |  |
|  |  * AES-256-GCM Encryption of Aadhaar / PAN / Bank Account               |  |
|  +-------------------------------------------------------------------------+  |
|                                      |                                        |
|                                      v                                        |
|  +-------------------------------------------------------------------------+  |
|  |                        PRISMA ORM (Data Layer)                          |  |
|  |  - Parameterized Queries     - Type-Safe Models     - Cascading Audits |  |
|  +-------------------------------------------------------------------------+  |
+-------------------------------------------------------------------------------+
                                      |
                                      | MySQL Connection Pool (Port 3306)
                                      v
+-------------------------------------------------------------------------------+
|                       MYSQL RELATIONAL DATABASE                               |
|                                                                               |
|  - Member & Timeline Events     - AdminUser (Bcrypt)   - FinancialSchemeEnq   |
|  - Product & Order              - ServiceRequest       - ContactRequest       |
|  - EducationEnquiry             - BusinessConsultancy  - CooperativeTrading   |
+-------------------------------------------------------------------------------+
```

---

## 4. Complete Folder Structure

```
kalpavruksha/
├── .npmrc                         # Package manager configuration
├── .gitignore                     # Git exclusion rules
├── package.json                   # Root workspace scripts & tooling
├── vercel.json                    # Root Vercel SPA deployment rewrite configuration
├── members_dump.json              # Static membership seed/backup archive
│
├── frontend/                      # React SPA Client
│   ├── .env.production            # Production environment variables (VITE_API_URL)
│   ├── index.html                 # HTML5 document entrypoint
│   ├── package.json               # Frontend dependencies & npm scripts
│   ├── postcss.config.js          # PostCSS configuration for Tailwind CSS
│   ├── tailwind.config.js         # Tailwind theme colors, fonts, screens
│   ├── tsconfig.json              # TypeScript compilation rules for React
│   ├── vercel.json                # Frontend Vercel single-page rewrite rules
│   ├── vite.config.js             # Vite configuration, dev port 5000, backend proxy
│   ├── public/                    # Static assets served as-is (images, logos)
│   └── src/
│       ├── main.tsx               # Client React DOM render entrypoint
│       ├── App.tsx                # Master client router & route definitions
│       ├── index.css              # Global styles, Tailwind imports, custom scrollbars
│       ├── api/
│       │   └── index.js           # Centralized API service layer (publicApi, adminApi)
│       ├── components/
│       │   ├── Navbar.tsx         # Responsive navigation bar with division dropdowns
│       │   ├── Footer.tsx         # Cooperative footer with legal & contact info
│       │   ├── EmiCalculator.jsx  # Interactive Loan / EMI Calculator component
│       │   ├── ProtectedAdminRoute.tsx # Route guard checking admin authentication
│       │   └── ScrollToTop.tsx    # Automated window scroll reset on route changes
│       ├── context/
│       │   └── AdminAuthContext.tsx # React Context managing admin login state
│       ├── constants/             # Static configurations & navigation datasets
│       ├── data/                  # Static product & service catalogs
│       ├── hooks/                 # Custom React utility hooks
│       ├── pages/                 # Dynamic detail views (Products, Projects)
│       └── pages_migrated/        # Core page views (Home, About, Membership, Admin)
│
└── backend/                       # Node.js Express REST API
    ├── .env                       # Backend secrets (DATABASE_URL, JWT_SECRET, PORT)
    ├── .env.example               # Template environment configuration
    ├── package.json               # Backend dependencies & npm scripts
    ├── tsconfig.json              # TypeScript compiler configuration for Node.js
    ├── seedAdmin.ts               # CLI script to seed default admin user
    ├── uploads/                   # Local storage directory for uploaded member files
    ├── prisma/
    │   └── schema.prisma          # Prisma schema definition & MySQL models
    └── src/
        ├── app.ts                 # Express application initialization & middleware stack
        ├── server.ts              # Server bootstrap & database connection listener
        ├── config/
        │   ├── cors.ts            # CORS origin whitelist & configuration
        │   ├── database.ts        # Prisma client singleton instance
        │   ├── env.ts             # Strongly-typed environment variables loader
        │   └── mail.ts            # Nodemailer transporter configuration
        ├── controllers/           # HTTP Request/Response handlers
        │   ├── auth.controller.ts
        │   ├── membership.controller.ts
        │   ├── financial.controller.ts
        │   ├── contact.controller.ts
        │   └── service.controller.ts
        ├── middleware/            # Express request pipeline filters
        │   ├── auth.middleware.ts        # JWT verification & admin route guard
        │   ├── error.middleware.ts       # Global error handler & AppError class
        │   ├── not-found.middleware.ts   # 404 handler
        │   ├── rate-limit.middleware.ts  # Express rate limiters
        │   └── upload.middleware.ts      # Multer file upload & static gatekeeper
        ├── routes/                # Express router endpoints
        │   ├── auth.routes.ts
        │   ├── membership.routes.ts
        │   ├── financial.routes.ts
        │   └── contact.routes.ts
        ├── services/              # Pure business logic & database transactions
        │   ├── auth.service.ts
        │   ├── membership.service.ts
        │   └── financial.service.ts
        ├── utils/                 # Cryptography, JWT, CSV generation, OTP utils
        │   ├── crypto.ts          # AES-256-GCM encryption & decryption
        │   ├── csv.util.ts        # CSV stringifier for administrative exports
        │   ├── jwt.ts             # JWT token sign & verify helpers
        │   └── otp.ts             # Cryptographic OTP generator
        └── validators/            # Request body sanitizers & format validators
            └── common.validator.ts
```

---

## 5. Database Schema & Models

The database contains 14 specialized models managed through **Prisma ORM** targeting MySQL:

### 1. `Member`
The central model of the cooperative platform storing member details:
- **Identity**: `id` (UUID primary key), `memberId` (e.g. `KMC-MEM-849201`).
- **Personal Details**: `fullName`, `fatherName`, `dob`, `age`, `gender`, `occupation`, `annualIncome`, `category`.
- **Contact**: `mobileNumber`, `whatsappNumber`, `alternateMobile`, `email`.
- **Address**: `houseNo`, `street`, `village`, `mandal`, `district`, `state`, `pinCode`.
- **KYC & Banking (Encrypted)**: `aadhaarNumber` *(AES-256-GCM)*, `panNumber` *(AES-256-GCM)*, `accountNumber` *(AES-256-GCM)*, `form60`, `bankName`, `accountHolder`, `ifscCode`, `bankBranch`.
- **Membership & Payments**: `membershipType`, `membershipFee`, `shareCapital`, `totalAmount`, `paymentStatus` (`Pending`, `Paid`), `paymentMethod`, `transactionId`, `paymentDate`.
- **Nominee Details**: `nomineeName`, `nomineeRelationship`, `nomineeDob`, `nomineeMobile`, `nomineeAadhaar`, `nomineeAddress`, `nomineeShare`.
- **Introducer Details**: `introducerName`, `introducerMemberId`, `introducerMobile`.
- **File References**: `photoUrl`, `aadhaarUrl`, `panUrl`, `addressProofUrl`, `signatureUrl`.
- **Administrative Tracking**: `kycStatus` (`PENDING`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`), `applicationStatus` (`PENDING`, `APPROVED`, `REJECTED`, `REQUEST_MORE_DOCUMENTS`), `verificationNotes`, `rejectionReason`, `lastUpdatedBy`.
- **Relations**: Has many `MemberTimelineEvent` records (cascade delete).

### 2. `MemberTimelineEvent`
Maintains an immutable audit trail for member status transitions:
- `id`, `memberId` (foreign key referencing `Member.id`), `title` (e.g., `"Application status changed to APPROVED"`), `type` (`STATUS`, `DOCUMENT`, `SYSTEM`), `createdAt`.

### 3. `AdminUser`
Administrative accounts with role-based access:
- `id`, `email` (unique), `password` (bcrypt hash), `name`, `role` (`ADMIN`), `isActive` (boolean), `lastLoginAt`.

### 4. Inquiry & Request Models
- `FinancialSchemeEnquiry`: Captures prospective investors for term deposit schemes.
- `ContactRequest`: General public messages submitted via `/contact`.
- `ServiceRequest`: Inquiries for society services and member assistance.
- `EducationEnquiry`: Training and course admissions.
- `BusinessConsultancyEnquiry`: Micro-enterprise advisory requests.
- `CooperativeTradingEnquiry`: Bulk commodity and agricultural trading leads.
- `Lead`: Quick loan and K-TIP leads generated from calculators.

---

## 6. Detailed Code Explanations of Core Files

### 1. Backend Entry (`backend/src/server.ts` & `backend/src/app.ts`)

#### [backend/src/server.ts](file:///c:/Users/LENOVO/Desktop/kalpavruksha/backend/src/server.ts)
```typescript
import app from './app';
import { config } from './config/env';
import prisma from './config/database';

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully.');

    const server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port} in ${config.env} mode.`);
    });
...
```
- **Line-by-Line Breakdown**:
  - `prisma.$connect()`: Tests the MySQL connection before opening the network port. If database credentials fail, the server fails fast and exits cleanly.
  - `app.listen(config.port)`: Binds the Express app to the configured port (`8000` in development, or environment variable in production).
  - `process.on('SIGTERM', shutdown)`: Handles container and operating system termination signals, disconnecting Prisma connections to prevent socket hangs.

---

### 2. Authentication Middleware (`backend/src/middleware/auth.middleware.ts`)

```typescript
export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req.query?.token as string) 
      || req.cookies?.admin_session 
      || (req.headers.authorization?.startsWith('Bearer ') 
          ? req.headers.authorization.split(' ')[1] 
          : req.headers.authorization);

    if (!token) {
      return next(new AppError('Unauthorized: No session token provided', 401));
    }

    const decoded = verifyToken(token);
    const admin = await prisma.adminUser.findUnique({ where: { id: decoded.id } });

    if (!admin || !admin.isActive) {
      return next(new AppError('Forbidden: Admin account is inactive or not found', 403));
    }

    req.admin = admin;
    next();
  } catch (error) {
    next(new AppError('Unauthorized: Invalid or expired session', 401));
  }
};
```
- **How It Works**:
  1. **Token Extraction**: Flexibly extracts the JWT from three locations:
     - `req.cookies.admin_session`: Standard browser cookie.
     - `req.headers.authorization`: Standard `Bearer <token>` HTTP header used by REST clients.
     - `req.query.token`: Allows authorized CSV and document downloads via direct browser window links.
  2. **Signature Verification**: `verifyToken(token)` checks the cryptographic signature using HMAC SHA-256 and the server's `JWT_SECRET`. If expired or tampered with, it throws an error.
  3. **Database Validation**: Ensures the administrator exists and has not been deactivated (`admin.isActive === true`).
  4. **Context Injection**: Sets `req.admin = admin`, making admin metadata available to downstream controllers.

---

### 3. Encryption Utility (`backend/src/utils/crypto.ts`)

```typescript
const ALGORITHM = 'aes-256-gcm';

export const encrypt = (text: string | null | undefined): string | null => {
  if (!text) return null;
  const key = getEncryptionKey(); // 32-byte Buffer from hex
  const iv = crypto.randomBytes(12); // 96-bit Initialization Vector
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');

  return `${iv.toString('hex')}:${encrypted}:${authTag}`;
};
```
- **How It Works**:
  - Uses **AES-256-GCM** (Galois/Counter Mode), an industry-standard authenticated encryption algorithm.
  - Generates a **new random 12-byte IV** for every single encryption operation. Even if two members have the exact same Aadhaar or PAN number, their encrypted values stored in MySQL will look completely different, preventing statistical analysis attacks.
  - Produces an **Authentication Tag** (`authTag`) that detects any unauthorized database tampering upon decryption.
  - Stored format: `iv:ciphertext:authTag`.

---

### 4. Upload Security Middleware (`backend/src/middleware/upload.middleware.ts`)

```typescript
// Block sensitive documents from public static access
export const protectSensitiveFiles = (req: Request, res: Response, next: NextFunction) => {
  const isSensitive = /^(photo|aadhaar|pan|addressProof|signature|document)-/.test(req.path.substring(1));
  if (isSensitive) {
    return next(new AppError('Forbidden: Sensitive documents cannot be accessed directly. Use the secure API.', 403));
  }
  next();
};
```
- **How It Works**:
  - Normal files (such as public marketing banners) can be served statically.
  - Any uploaded file prefixed with `photo-`, `aadhaar-`, `pan-`, `addressProof-`, or `signature-` is intercepted and blocked with HTTP 403.
  - Administrators must access files via the authorized endpoint `/api/admin/members/:memberId/documents/:documentId`, which verifies their session token before streaming the file.

---

### 5. Membership Controller & Service (`membership.controller.ts` & `membership.service.ts`)

#### [backend/src/controllers/membership.controller.ts](file:///c:/Users/LENOVO/Desktop/kalpavruksha/backend/src/controllers/membership.controller.ts)
```typescript
  static async exportData(req: Request, res: Response, next: NextFunction) {
    try {
      const members = await MembershipService.getMembers(...);

      // Strip sensitive fields
      const safeMembers = members.map((member: any) => {
        const { 
          aadhaarNumber, panNumber, accountNumber, 
          photoUrl, signatureUrl, aadhaarUrl, panUrl,
          ...safeData 
        } = member;
        return safeData;
      });

      const csvData = CsvUtil.generateCsv(safeMembers);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="memberships.csv"');
      res.status(200).send(csvData);
...
```
- **Security Design**:
  - When exporting member spreadsheets for administrative reporting, the system explicitly destructs and strips unencrypted Aadhaar, PAN, Bank Account numbers, and raw identity document paths.
  - This ensures that administrative CSV files do not inadvertently leak sensitive citizen data outside the application.

---

### 6. Frontend API Client (`frontend/src/api/index.js`)

```javascript
export const API_URL = import.meta.env.VITE_API_URL || '/api';

const getAdminHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('admin_token') : null;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (e) {}
  return headers;
};
```
- **How It Works**:
  - `API_URL`: Points to `/api` in development (which Vite automatically proxies to `http://localhost:8000`), or to the remote production backend (`https://kalpavruksha-hmsw.onrender.com/api`).
  - `getAdminHeaders`: Retrieves the active token from `localStorage` and constructs the `Authorization` header.
  - `ADMIN_HEADERS` uses a JavaScript `Proxy` to dynamically evaluate the token on every outgoing request without needing manual token passing in component code.

---

### 7. Frontend Route & App Architecture (`frontend/src/App.tsx`)

```tsx
// Lazy Page Imports
const Home = lazy(() => import('./pages_migrated/Home'));
const Membership = lazy(() => import('./pages_migrated/Membership'));
const AdminDashboard = lazy(() => import('./pages_migrated/AdminDashboard'));
...
<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/membership" element={<Membership />} />
    
    {/* Admin Protected Routes */}
    <Route element={<AdminAuthProvider><Outlet /></AdminAuthProvider>}>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>}>
        <Route index element={<DashboardOverview />} />
        <Route path="members" element={<Members />} />
        ...
      </Route>
    </Route>
  </Routes>
</Suspense>
```
- **Key Concepts**:
  - **Code Splitting via `React.lazy` & `Suspense`**: Pages are compiled into separate JavaScript bundles and downloaded on-demand only when a user navigates to them, keeping the initial page load fast.
  - **Route Protection Hierarchy**: Admin routes are wrapped in `AdminAuthProvider` to supply auth state, and secured sub-routes are guarded by `<ProtectedAdminRoute>`.

---

### 8. Protected Admin Route & Auth Context (`ProtectedAdminRoute.tsx` & `AdminAuthContext.tsx`)

#### [frontend/src/components/ProtectedAdminRoute.tsx](file:///c:/Users/LENOVO/Desktop/kalpavruksha/frontend/src/components/ProtectedAdminRoute.tsx)
```tsx
export const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAdminAuth();

  if (auth.isCheckingAuth) {
    return <Loading />;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};
```
- **How It Works**:
  - While verifying with `/api/admin/auth/me`, it renders a clean loading screen to avoid UI flickering.
  - If unauthenticated, it issues an immediate client-side redirection to `/admin/login`.
  - If authenticated, it renders the protected child layout.

---

### 9. Loan EMI Calculator (`frontend/src/components/EmiCalculator.jsx`)

```jsx
export default function EmiCalculator() {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(200000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(36);
  ...
  useEffect(() => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure;
    
    if (p > 0 && r > 0 && n > 0) {
      const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(Math.round(emiValue));
      const totalRepay = Math.round(emiValue * n);
      setTotalRepayment(totalRepay);
      setTotalInterest(totalRepay - p);
    }
  }, [loanAmount, interestRate, tenure]);
```
- **Slider Configuration & Currency Formatting**:
  - Range: `min="5000"`, `max="500000"`, `step="5000"`.
  - Real-time gradient background tracking: `(loanAmount - 5000) / 495000 * 100`.
  - Formatted using `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`.
  - **Apply Now Action**: Triggers `navigate('/membership')` to route users directly into the onboarding funnel without full-page reloads.

---

## 7. Environment Configuration & Deployment

### Environment Variables

#### Backend (`backend/.env`)
- `DATABASE_URL`: Connection URI to MySQL (`mysql://<user>:<password>@srv2205.hstgr.io:3306/<dbname>`).
- `ENCRYPTION_KEY`: 64-character hex string (32 bytes) for AES-256-GCM encryption.
- `JWT_SECRET`: Cryptographic secret key for signing admin access tokens.
- `PORT`: Network port for Express server (default `8000` in dev, or platform port).
- `NODE_ENV`: Set to `production` or `development`.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: Credentials for sending password-reset OTP emails.

#### Frontend (`frontend/.env.production`)
- `VITE_API_URL`: Production REST API base endpoint (e.g. `https://kalpavruksha-hmsw.onrender.com/api`).

---

### Deployment Architecture
1. **Frontend Hosting (Vercel)**:
   - Configured via root [vercel.json](file:///c:/Users/LENOVO/Desktop/kalpavruksha/vercel.json).
   - Build Command: `cd frontend && npm run build`.
   - Output Directory: `frontend/dist`.
   - Rewrites: `/(.*)` rewrites to `/index.html` to support client-side React Router navigation.
2. **Backend Hosting (Render / Node Container)**:
   - Command: `node dist/server.js`.
   - Pre-build step: `prisma generate` to compile Prisma client.
3. **Database Hosting (Hostinger Managed MySQL)**:
   - Dedicated MySQL instance with connection encryption.

---

## 8. Common Interview Questions & Model Answers

### Q1: How does the application handle sensitive personal information like Aadhaar and PAN numbers?
> **Answer**:  
> "The Kalpavruksha platform implements field-level authenticated encryption using **AES-256-GCM**. Before saving any `Member` record to the MySQL database, sensitive fields (`aadhaarNumber`, `panNumber`, and `accountNumber`) are encrypted using a 32-byte cryptographic key and a unique, cryptographically random 12-byte Initialization Vector (IV) generated for each entry. The database stores the combined `iv:ciphertext:authTag`. On retrieval by an authenticated administrator, the values are decrypted on-the-fly. Additionally, sensitive document uploads (Aadhaar cards, photos, signatures) are shielded by a middleware gatekeeper that blocks direct static web access; they can only be downloaded via protected API endpoints that verify administrator authorization."

---

### Q2: What is the architectural relationship between Vite, the frontend, and Express in development vs. production?
> **Answer**:  
> "In development, Vite serves the frontend on `http://localhost:5000` and provides a built-in reverse proxy that forwards any `/api/*` HTTP requests to the Express backend running on `http://localhost:8000`. This completely avoids CORS preflight issues during local development. In production, the frontend is compiled into optimized static HTML, CSS, and JS bundles deployed on Vercel, while the Express API runs on a dedicated Node.js service (such as Render). Cross-origin requests in production are validated using an Express CORS whitelist and secure cookies."

---

### Q3: How is authentication and route protection implemented for the Admin portal?
> **Answer**:  
> "Authentication uses a stateless JWT architecture combined with `HttpOnly` and `SameSite` cookies to mitigate XSS and CSRF risks. When an administrator logs in, the backend verifies their bcrypt password hash, generates a 12-hour signed JWT, and sets an `admin_session` cookie while also returning the token in JSON. On the frontend, `AdminAuthProvider` checks session validity with `/api/admin/auth/me`. The `<ProtectedAdminRoute>` wrapper renders a loading screen during validation and redirects unauthenticated users to `/admin/login`. On the backend, the `requireAdmin` middleware inspects the cookie or `Authorization: Bearer` header, verifies the token signature, and checks the database to ensure the admin account is still active."

---

### Q4: How does the Loan / EMI Calculator work technically?
> **Answer**:  
> "The calculator uses standard mathematical loan amortization:  
> $$E = P \cdot r \cdot \frac{(1 + r)^n}{(1 + r)^n - 1}$$  
> where $P$ is principal loan amount, $r$ is monthly interest rate ($\text{annual rate} / 12 / 100$), and $n$ is tenure in months. In React, a `useEffect` hook recalculates the monthly EMI, total repayment, and total interest reactively whenever loan amount, interest rate, or tenure changes. The slider supports values from ₹5,000 to ₹5,00,000 in steps of ₹5,000, updates an inline linear-gradient track in real time, formats values using the `en-IN` Indian numbering system, and routes users directly to the `/membership` registration page upon clicking 'APPLY NOW'."

---

### Q5: What happens if an unauthenticated user tries to download an Aadhaar or PAN upload file directly from `/uploads/`?
> **Answer**:  
> "The backend registers a custom middleware called `protectSensitiveFiles` before Express's static file handler. This middleware evaluates the file path using a regular expression:  
> `/^(photo|aadhaar|pan|addressProof|signature|document)-/`  
> If an unauthenticated user attempts to access any matching file, the request is immediately terminated with an `AppError('Forbidden: Sensitive documents cannot be accessed directly. Use the secure API.', 403)`. Only authenticated administrators passing through `/api/admin/members/:memberId/documents/:documentId` can view or download those documents."
