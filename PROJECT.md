# Hospital Management System (HMS 2.0)

## 🏥 Project Overview

HMS 2.0 is a comprehensive, full-stack **Hospital Management System** built with modern web technologies. It provides role-based dashboards for patients, doctors, administrators, and staff to manage appointments, medical records, prescriptions, and hospital operations efficiently.

This project demonstrates end-to-end full-stack development skills, including:
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript + MongoDB (Mongoose)
- **Authentication**: JWT-based auth with bcrypt password hashing
- **State Management**: Zustand with persistence
- **Form Handling**: React Hook Form + Zod validation
- **Routing**: React Router v6 with protected routes
- **API Design**: RESTful API with role-based access control

---

## 📋 Table of Contents

- [Core Features](#-core-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Data Models](#-data-models)
- [API Endpoints](#-api-endpoints)
- [Authentication & Authorization](#-authentication--authorization)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Seeding Data](#-seeding-data)
- [Development Workflow](#-development-workflow)
- [Key Technical Decisions](#-key-technical-decisions)
- [Future Enhancements](#-future-enhancements)

---

## 🚀 Core Features

### Patient Portal
- **User Registration & Login**: Secure authentication with JWT tokens
- **Appointment Booking**: Schedule appointments with specific doctors and departments
- **Medical History**: View past appointments, diagnoses, and treatments
- **Prescription Management**: Access current and past prescriptions
- **Profile Management**: Update personal information and medical details

### Doctor Dashboard
- **Appointment Management**: View, confirm, reschedule, or cancel appointments
- **Patient Records**: Access patient medical history and notes
- **Prescription Creation**: Create and manage prescriptions for patients
- **Medical Records**: Add diagnosis, treatment plans, and notes
- **Schedule Management**: View daily/weekly appointment schedules
- **Analytics**: Track appointment statistics and patient trends

### Admin Dashboard
- **Doctor Management**: Add, edit, or remove doctor profiles
- **Department Overview**: Monitor department-wise patient load and appointments
- **Staff Management**: Manage staff accounts and permissions
- **Activity Logs**: Track system activity and user actions
- **Appointment Oversight**: View and manage all appointments across the hospital

### Staff Dashboard
- **Appointment Coordination**: Assist with appointment scheduling and management
- **Patient Check-in**: Manage patient arrivals and queue
- **Basic Reporting**: Generate appointment and patient reports

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI framework with hooks and functional components |
| **TypeScript** | 5.8.3 | Type-safe JavaScript with compile-time checks |
| **Vite** | 5.4.2 | Fast build tool and dev server with HMR |
| **Tailwind CSS** | 3.4.1 | Utility-first CSS framework for rapid UI development |
| **React Router** | 6.22.3 | Client-side routing with protected routes |
| **Zustand** | 4.5.2 | Lightweight state management with persistence |
| **React Hook Form** | 7.51.0 | Performant form handling with minimal re-renders |
| **Zod** | 3.22.4 | Schema validation for forms and API responses |
| **Lucide React** | 0.344.0 | Modern icon library |
| **jsPDF** | 2.5.2 | PDF generation for prescriptions and reports |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | LTS | JavaScript runtime |
| **Express** | 4.18.2 | Web framework for REST API |
| **TypeScript** | 5.1.3 | Type-safe server-side code |
| **MongoDB** | - | NoSQL database for flexible data modeling |
| **Mongoose** | 7.0.3 | ODM for MongoDB with schema validation |
| **JWT** | 9.0.2 | JSON Web Tokens for stateless authentication |
| **bcryptjs** | 3.0.2 | Password hashing and comparison |
| **CORS** | 2.8.5 | Cross-Origin Resource Sharing middleware |
| **dotenv** | 16.0.3 | Environment variable management |

### Development Tools
- **ESLint**: Code linting with React and TypeScript rules
- **PostCSS**: CSS processing for Tailwind
- **ts-node**: TypeScript execution for development and scripts

---

## 🏗 Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
│  React App (Vite) + TypeScript + Tailwind + Zustand         │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP/JSON (REST API)
                        │ JWT Token in Authorization Header
┌───────────────────────▼─────────────────────────────────────┐
│                    Backend (Node.js)                         │
│  Express Server + TypeScript + Middleware                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Middleware Layer                                     │    │
│  │  - CORS                                              │    │
│  │  - JSON Body Parser                                  │    │
│  │  - Request Logger                                    │    │
│  │  - Error Handler                                     │    │
│  │  - JWT Authentication (authenticate)                 │    │
│  │  - Role Authorization (authorize)                    │    │
│  └─────────────────────┬───────────────────────────────┘    │
│  ┌─────────────────────▼───────────────────────────────┐    │
│  │ Routes                                               │    │
│  │  /api/doctors       /api/appointments                │    │
│  └─────────────────────┬───────────────────────────────┘    │
│  ┌─────────────────────▼───────────────────────────────┐    │
│  │ Controllers                                          │    │
│  │  - doctorController                                  │    │
│  │  - appointmentController                             │    │
│  └─────────────────────┬───────────────────────────────┘    │
│  ┌─────────────────────▼───────────────────────────────┐    │
│  │ Models (Mongoose Schemas)                            │    │
│  │  - Doctor                                            │    │
│  │  - Appointment                                       │    │
│  └─────────────────────┬───────────────────────────────┘    │
└────────────────────────┼─────────────────────────────────────┘
                         │ MongoDB Driver (Mongoose)
┌────────────────────────▼─────────────────────────────────────┐
│                    MongoDB Database                          │
│  Collections: doctors, appointments                          │
└──────────────────────────────────────────────────────────────┘
```

### Frontend Architecture

**State Management** (Zustand):
- `authStore`: Patient authentication state (mock/simulated)
- `doctorAuthStore`: Doctor authentication with API integration and persistence
- `adminAuthStore`: Admin/staff authentication with role management

**Routing Strategy** (React Router):
- Public routes: Home, About, Contact, Departments, Services
- Auth routes: Login, Signup, Doctor Login, Admin Login
- Protected routes: Patient Portal, Doctor Dashboard, Admin Dashboard, Staff Dashboard
- `PrivateRoute` component validates role-based access

**Component Architecture**:
- **Pages**: Top-level route components
- **Layouts**: Header, Footer, AuthLayout
- **Features**: appointments/, auth/, doctor/, admin/, staff/, portal/
- **UI Components**: Reusable Button, Input, Card, Badge, Modal
- **Constants**: Static data for doctors, services, testimonials

---

## 📊 Data Models

### Doctor Model (`backend/src/models/doctorModel.ts`)

```typescript
interface IDoctor {
  _id: ObjectId;
  name: string;
  email: string;           // Unique, used for login
  password: string;        // Hashed with bcrypt
  specialization: string;  // e.g., "Cardiologist", "Pediatrician"
  department: string;
  phone: string;
  experience: number;      // Years of experience
  qualification: string;   // e.g., "MBBS, MD"
  availability: {
    day: string;           // e.g., "Monday"
    slots: string[];       // e.g., ["09:00 AM", "10:00 AM"]
  }[];
  role: string;            // "doctor" or "admin"
  createdAt: Date;
  updatedAt: Date;
}
```

**Features**:
- Password is hashed before saving using bcrypt (pre-save hook)
- Availability slots for appointment scheduling
- Role-based permissions (doctor vs admin)

### Appointment Model (`backend/src/models/Appointments.ts`)

```typescript
interface IAppointment {
  _id: ObjectId;
  patientName: string;
  email: string;           // Patient contact email
  phone: string;
  department: string;
  doctor: string;          // Doctor name (could be ObjectId reference)
  date: Date;              // Appointment date
  time: string;            // Appointment time slot
  reason: string;          // Chief complaint / reason for visit
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}
```

**Status Flow**:
1. `pending`: Appointment created by patient
2. `confirmed`: Doctor/staff confirms the appointment
3. `completed`: Appointment finished
4. `cancelled`: Appointment cancelled by patient or doctor

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
```http
GET /health
Response: { "status": "ok", "timestamp": "2025-10-28T12:00:00.000Z" }
```

---

### 🩺 Doctor Endpoints (`/api/doctors`)

#### 1. Register Doctor
```http
POST /api/doctors/register
Content-Type: application/json

Body:
{
  "name": "Dr. Sarah Johnson",
  "email": "sarah.johnson@hms.com",
  "password": "SecurePass123",
  "specialization": "Cardiologist",
  "department": "Cardiology",
  "phone": "+1234567890",
  "experience": 10,
  "qualification": "MBBS, MD (Cardiology)",
  "availability": [
    {
      "day": "Monday",
      "slots": ["09:00 AM", "10:00 AM", "02:00 PM"]
    }
  ],
  "role": "doctor"
}

Response (201):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "doctor": { /* doctor object without password */ }
}
```

#### 2. Login Doctor
```http
POST /api/doctors/login
Content-Type: application/json

Body:
{
  "email": "sarah.johnson@hms.com",
  "password": "SecurePass123"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "doctor": { /* doctor object without password */ }
}
```

#### 3. Get Current Doctor (Protected)
```http
GET /api/doctors/me
Authorization: Bearer <token>

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Dr. Sarah Johnson",
  "email": "sarah.johnson@hms.com",
  "specialization": "Cardiologist",
  "department": "Cardiology",
  // ... other fields (no password)
}
```

#### 4. Update Doctor Profile (Protected)
```http
PUT /api/doctors/me
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "phone": "+1234567899",
  "availability": [ /* updated availability */ ]
}

Response (200):
{
  "message": "Doctor profile updated",
  "doctor": { /* updated doctor */ }
}
```

#### 5. Get All Doctors (Admin Only)
```http
GET /api/doctors
Authorization: Bearer <admin-token>

Response (200):
[
  { /* doctor 1 */ },
  { /* doctor 2 */ }
]
```

#### 6. Delete Doctor (Admin Only)
```http
DELETE /api/doctors/:id
Authorization: Bearer <admin-token>

Response (200):
{
  "message": "Doctor deleted successfully"
}
```

---

### 📅 Appointment Endpoints (`/api/appointments`)

#### 1. Create Appointment
```http
POST /api/appointments
Content-Type: application/json

Body:
{
  "patientName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "department": "Cardiology",
  "doctor": "Dr. Sarah Johnson",
  "date": "2025-11-05",
  "time": "10:00 AM",
  "reason": "Chest pain and shortness of breath",
  "status": "pending"
}

Response (201):
{
  "message": "Appointment created successfully",
  "appointment": { /* appointment object */ }
}
```

#### 2. Get Appointments (with filters)
```http
GET /api/appointments?doctor=Dr.%20Sarah%20Johnson&status=pending
GET /api/appointments?date=2025-11-05
GET /api/appointments  # Get all

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "patientName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "department": "Cardiology",
    "doctor": "Dr. Sarah Johnson",
    "date": "2025-11-05T00:00:00.000Z",
    "time": "10:00 AM",
    "reason": "Chest pain and shortness of breath",
    "status": "pending",
    "createdAt": "2025-10-28T10:00:00.000Z",
    "updatedAt": "2025-10-28T10:00:00.000Z"
  }
]
```

#### 3. Update Appointment Status
```http
PATCH /api/appointments/:id/status
Content-Type: application/json

Body:
{
  "status": "confirmed"
}

Response (200):
{
  "message": "Appointment status updated",
  "appointment": { /* updated appointment */ }
}
```

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. **Registration/Login**:
   - User submits email + password
   - Backend validates credentials (bcrypt for password comparison)
   - Backend generates JWT token signed with `JWT_SECRET`
   - Token includes user ID and role in payload
   - Token returned to client with expiry (default: 30 days)

2. **Token Storage**:
   - Frontend stores JWT in `localStorage`
   - Zustand store persists auth state across page reloads

3. **Protected Requests**:
   - Client sends token in `Authorization: Bearer <token>` header
   - Backend `authenticate` middleware verifies token
   - Middleware attaches decoded user to `req.user`

4. **Authorization**:
   - `authorize(['admin'])` middleware checks `req.user.role`
   - Returns 403 Forbidden if role doesn't match

### Middleware Chain

```typescript
// Public route
router.post('/login', loginDoctor);

// Protected route (requires authentication)
router.use(authenticate);
router.get('/me', getCurrentDoctor);

// Admin-only route (requires authentication + admin role)
router.use(authorize(['admin']));
router.get('/', getAllDoctors);
```

### JWT Payload Structure

```json
{
  "id": "507f1f77bcf86cd799439011",
  "role": "doctor",
  "iat": 1698508800,
  "exp": 1701100800
}
```

---

## 📁 Project Structure

```
hms-2.0/
├── backend/                        # Node.js + Express backend
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts         # MongoDB connection setup
│   │   ├── controllers/
│   │   │   ├── appointmentController.ts
│   │   │   └── doctorController.ts
│   │   ├── middleware/
│   │   │   └── auth.ts             # JWT authentication & authorization
│   │   ├── models/
│   │   │   ├── Appointments.ts     # Mongoose appointment schema
│   │   │   ├── Doctor.ts           # Legacy PostgreSQL model (unused)
│   │   │   └── doctorModel.ts      # Mongoose doctor schema
│   │   ├── routes/
│   │   │   ├── appointmentRoutes.ts
│   │   │   └── doctorRoutes.ts
│   │   ├── utils/
│   │   │   └── emails.ts           # Email utility (future feature)
│   │   ├── seedDoctors.ts          # Script to seed sample doctors
│   │   └── server.ts               # Express app entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── setup.ps1                   # PowerShell setup script
│
├── src/                            # React + TypeScript frontend
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── dashboard/          # Admin sub-components
│   │   ├── appointments/
│   │   │   ├── AppointmentForm.tsx
│   │   │   ├── AppointmentModal.tsx
│   │   │   └── DoctorAppointments.tsx
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   ├── DoctorLogin.tsx
│   │   │   ├── AdminLoginForm.tsx
│   │   │   └── AuthLayout.tsx
│   │   ├── doctor/
│   │   │   ├── DoctorDashboard.tsx
│   │   │   └── dashboard/          # Doctor portal components
│   │   │       ├── AppointmentList.tsx
│   │   │       ├── AppointmentDetails.tsx
│   │   │       ├── AddPrescription.tsx
│   │   │       ├── AddMedicalRecord.tsx
│   │   │       └── DoctorProfile.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Doctors.tsx
│   │   │   └── Testimonials.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Logo.tsx
│   │   ├── pages/                  # Standalone pages
│   │   ├── portal/                 # Patient portal
│   │   ├── staff/                  # Staff dashboard
│   │   └── ui/                     # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── DashboardCard.tsx
│   │       └── StatusBadge.tsx
│   ├── constants/
│   │   ├── doctors.ts              # Mock doctor data for home page
│   │   ├── services.ts
│   │   └── testimonials.ts
│   ├── services/
│   │   └── api.ts                  # API client utilities
│   ├── stores/
│   │   ├── authStore.ts            # Patient auth (mock)
│   │   ├── doctorAuthStore.ts      # Doctor auth (real API)
│   │   └── adminAuthStore.ts       # Admin auth
│   ├── styles/
│   │   └── custom-animations.css
│   ├── types/
│   │   ├── admin.ts
│   │   ├── appointment.ts
│   │   ├── auth.ts
│   │   ├── doctor.ts
│   │   └── index.ts
│   ├── App.tsx                     # Root component + routing
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Global styles + Tailwind imports
│
├── index.html                      # HTML template for Vite
├── package.json                    # Frontend dependencies
├── vite.config.ts                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript config (frontend)
├── eslint.config.js                # ESLint configuration
└── postcss.config.js               # PostCSS for Tailwind
```

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js**: v18+ (LTS recommended)
- **npm** or **yarn**: Latest version
- **MongoDB**: v5+ (local installation or MongoDB Atlas)
- **Git**: For version control

### 1. Clone the Repository

```powershell
git clone <repository-url>
cd hms-2.0
```

### 2. Install Frontend Dependencies

```powershell
npm install
```

### 3. Install Backend Dependencies

```powershell
cd backend
npm install
cd ..
```

---

## 🔧 Environment Variables

### Backend Environment Variables

Create `backend/.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/hms

# JWT Secret (use a strong, random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# JWT Expiry
JWT_EXPIRE=30d

# CORS Origin (frontend URL)
CLIENT_URL=http://localhost:5173
```

**Security Note**: 
- Never commit `.env` to version control
- Use strong, random strings for `JWT_SECRET` in production
- Use MongoDB Atlas connection string for cloud deployment

### Frontend Environment Variables (Optional)

Create `.env` in root directory if needed:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Running the Application

### Development Mode

**Option 1: Run Backend and Frontend Separately (Recommended)**

Terminal 1 (Backend):
```powershell
cd backend
npm run dev
# Server runs on http://localhost:5000
```

Terminal 2 (Frontend):
```powershell
npm run dev
# Vite dev server runs on http://localhost:5173
```

**Option 2: Using PowerShell Setup Script**

```powershell
cd backend
./setup.ps1
# Follow prompts to install MongoDB, set up environment, and start services
```

### Production Build

**Frontend**:
```powershell
npm run build
npm run preview
```

**Backend**:
```powershell
cd backend
npm run build
npm start
# Runs compiled JavaScript from dist/ folder
```

---

## 🌱 Seeding Data

### Seed Sample Doctors

The backend includes a script to populate the database with sample doctor data:

```powershell
cd backend
npm run seed:doctors
```

This will create sample doctors across various departments (Cardiology, Pediatrics, Orthopedics, etc.) with availability slots.

### Manual Data Entry

You can also register doctors through the API:

```powershell
# Using curl (PowerShell)
Invoke-WebRequest -Uri http://localhost:5000/api/doctors/register `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"name":"Dr. John Smith","email":"john@hms.com","password":"password123","specialization":"Cardiologist","department":"Cardiology","phone":"+1234567890","experience":10,"qualification":"MBBS, MD","role":"doctor"}'
```

---

## 🔄 Development Workflow

### 1. Start MongoDB

**Local MongoDB**:
```powershell
# Windows (if installed as service)
net start MongoDB

# OR using mongod directly
mongod --dbpath C:\data\db
```

**MongoDB Atlas**:
- Update `MONGODB_URI` in `backend/.env` with your Atlas connection string

### 2. Start Backend Server

```powershell
cd backend
npm run dev
```

**Verify Backend**:
- Check console for "✅ MongoDB connected successfully"
- Visit http://localhost:5000/health (should return `{"status":"ok"}`)

### 3. Start Frontend Dev Server

```powershell
# From root directory
npm run dev
```

**Verify Frontend**:
- Browser opens to http://localhost:5173
- Home page loads with hero section, services, doctors, and testimonials

### 4. Test Core Flows

**Doctor Login Flow**:
1. Navigate to `/doctor/login`
2. Use seeded doctor credentials or register new doctor via API
3. Login → redirected to `/doctor/dashboard`
4. JWT token stored in localStorage
5. View appointments, add prescriptions, manage schedule

**Patient Appointment Flow**:
1. Navigate to "Book Appointment" or `/appointments`
2. Fill appointment form (patient details, doctor, date, time)
3. Submit → appointment created with `pending` status
4. Verify in doctor dashboard

**Admin Flow**:
1. Navigate to `/admin-login`
2. Login with admin role doctor account
3. Access admin dashboard → manage doctors, view all appointments

---

## 🧠 Key Technical Decisions

### 1. **Monorepo vs Separate Repos**
- **Chose**: Monorepo with `backend/` folder
- **Reason**: Easier development, shared TypeScript types (future), single deployment

### 2. **TypeScript for Backend**
- **Chose**: TypeScript over plain JavaScript
- **Reason**: Type safety, better IDE support, easier refactoring, catches errors at compile-time

### 3. **Zustand over Redux**
- **Chose**: Zustand for state management
- **Reason**: Simpler API, less boilerplate, built-in persistence, smaller bundle size

### 4. **Mongoose over Raw MongoDB Driver**
- **Chose**: Mongoose ODM
- **Reason**: Schema validation, middleware hooks (password hashing), cleaner query API

### 5. **JWT over Sessions**
- **Chose**: Stateless JWT authentication
- **Reason**: Scalable (no server-side session storage), works with microservices, mobile-friendly

### 6. **Vite over Create React App**
- **Chose**: Vite for frontend tooling
- **Reason**: Faster dev server (ESM-based), quicker builds, modern tooling

### 7. **Tailwind CSS over CSS-in-JS**
- **Chose**: Tailwind utility classes
- **Reason**: Rapid prototyping, consistent design system, smaller CSS bundle (PurgeCSS)

### 8. **React Hook Form + Zod over Formik**
- **Chose**: React Hook Form + Zod
- **Reason**: Better performance (fewer re-renders), TypeScript-first validation, smaller bundle

---

## 🔮 Future Enhancements

### Short-term (Low-hanging fruit)
- [ ] Add comprehensive unit and integration tests (Jest, Supertest, React Testing Library)
- [ ] Implement email notifications for appointments (using Nodemailer or SendGrid)
- [ ] Add appointment reminders (scheduled jobs with node-cron)
- [ ] Implement patient medical records upload (image/PDF files with S3 or local storage)
- [ ] Add search and filtering for appointments and doctors
- [ ] Implement pagination for large datasets
- [ ] Add input validation on backend routes (Zod or express-validator)
- [ ] Create `.env.example` files for easy setup
- [ ] Write comprehensive README with demo instructions

### Medium-term (Feature additions)
- [ ] Real-time notifications (WebSockets or Server-Sent Events)
- [ ] Video consultation integration (WebRTC or third-party API like Twilio)
- [ ] Payment integration for appointment fees (Stripe or PayPal)
- [ ] Advanced analytics dashboard with charts (Chart.js or Recharts)
- [ ] Multi-language support (i18n)
- [ ] Dark mode toggle
- [ ] Mobile app version (React Native)
- [ ] Export reports to PDF/Excel

### Long-term (Scalability & Production)
- [ ] Migrate to microservices architecture (separate services for auth, appointments, billing)
- [ ] Implement GraphQL API (Apollo Server)
- [ ] Add Redis caching for frequently accessed data
- [ ] Set up CI/CD pipeline (GitHub Actions, Jenkins)
- [ ] Containerize with Docker and Docker Compose
- [ ] Deploy to cloud (AWS, Azure, or Google Cloud)
- [ ] Implement rate limiting and API throttling
- [ ] Add comprehensive logging (Winston or Pino)
- [ ] Set up monitoring and alerting (Prometheus, Grafana)
- [ ] Implement database indexing and query optimization
- [ ] Add CDN for static assets
- [ ] Implement GDPR compliance features (data export, deletion)

---

## 📝 Notes & Considerations

### Known Issues
1. **Duplicate Health Endpoint**: `server.ts` has two identical `/health` route definitions (line ~62 and ~67) — remove one
2. **Mixed Dependency Location**: Some backend dependencies (express, mongoose) are in root `package.json` — should be moved to `backend/package.json`
3. **Unused Model File**: `backend/src/models/Doctor.ts` appears to be a legacy PostgreSQL model — can be removed
4. **Mock Patient Auth**: `authStore.ts` uses simulated authentication — should integrate with real API

### Security Considerations
- Always use HTTPS in production
- Implement rate limiting to prevent brute-force attacks
- Add input sanitization to prevent NoSQL injection
- Use helmet.js for HTTP header security
- Implement CSRF protection for sensitive operations
- Regularly update dependencies for security patches
- Use environment variables for all secrets
- Implement proper error handling without exposing sensitive data

### Performance Optimizations
- Add database indexes on frequently queried fields (email, date, doctor)
- Implement connection pooling for MongoDB
- Use lazy loading for React components (React.lazy + Suspense)
- Optimize images and assets
- Implement request caching where appropriate
- Use CDN for static assets in production
- Enable gzip compression on Express

---

## 📚 Learning Resources

This project demonstrates concepts from:
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [JWT.io](https://jwt.io/introduction)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---

## 📄 License

This project is for educational and portfolio purposes.

---

## 👨‍💻 Author

Created as a full-stack portfolio project demonstrating modern web development practices.

**Tech Stack Summary**: React + TypeScript + Vite + Tailwind | Node.js + Express + MongoDB + JWT

**Project Goal**: Showcase end-to-end development skills for technical interviews and real-world applications.
