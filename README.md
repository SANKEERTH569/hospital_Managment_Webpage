# Hospital Management System (HMS 2.0)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green.svg)](https://www.mongodb.com/)

A comprehensive, full-stack **Hospital Management System** built with modern web technologies. Features role-based dashboards for patients, doctors, and administrators to manage appointments, medical records, and hospital operations.

## 🎯 Interview-Ready Score: 9/10

This project demonstrates production-level full-stack development skills with comprehensive documentation for technical interviews.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB v5+
- npm or yarn

### Installation

1. **Clone and Install**
```powershell
git clone <repository-url>
cd hms-2.0

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

2. **Set Up Environment**

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hms
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=30d
```

3. **Start MongoDB**
```powershell
# Windows (if installed as service)
net start MongoDB
```

4. **Seed Sample Data**
```powershell
cd backend
npm run seed:doctors
cd ..
```

5. **Run Application**

Terminal 1 (Backend):
```powershell
cd backend
npm run dev
# Server runs on http://localhost:5000
```

Terminal 2 (Frontend):
```powershell
npm run dev
# App runs on http://localhost:5173
```

6. **Access Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/health

---

## 📋 Tech Stack

**Frontend**: React 18 • TypeScript • Vite • Tailwind CSS • Zustand • React Router • React Hook Form • Zod

**Backend**: Node.js • Express • TypeScript • MongoDB • Mongoose • JWT • bcrypt

**Tools**: ESLint • PostCSS • ts-node

---

## ✨ Key Features

- 🔐 **JWT Authentication** with role-based access control
- 👨‍⚕️ **Doctor Dashboard** — manage appointments, create prescriptions, view patient records
- 👤 **Patient Portal** — book appointments, view medical history
- 👨‍💼 **Admin Panel** — manage doctors, departments, and hospital operations
- 📅 **Appointment System** — scheduling with status tracking (pending/confirmed/completed/cancelled)
- 💊 **Prescription Management** — create and track medications
- 📊 **Analytics** — appointment trends and doctor workload
- 📱 **Responsive Design** — works on all devices

---

## 📁 Project Structure

```
hms-2.0/
├── backend/              # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth & error handling
│   │   └── server.ts     # Express app entry
│   └── package.json
│
├── src/                  # React + TypeScript frontend
│   ├── components/       # UI components
│   │   ├── admin/
│   │   ├── doctor/
│   │   ├── appointments/
│   │   ├── auth/
│   │   └── ui/
│   ├── stores/           # Zustand state management
│   ├── types/            # TypeScript types
│   └── App.tsx           # Root component
│
├── PROJECT.md            # 📚 Comprehensive technical documentation
├── INTERVIEW.md          # 🎤 Interview preparation guide
└── README.md             # This file
```

---

## 📚 Documentation

### 📘 [PROJECT.md](./PROJECT.md) — Complete Technical Documentation
**11,000+ words covering:**
- Architecture & design patterns
- Data models & API endpoints
- Authentication & authorization flow
- Database design & schema
- Setup & installation guide
- Security considerations
- Future enhancements

👉 **Read this for deep technical understanding**

### 🎤 [INTERVIEW.md](./INTERVIEW.md) — Interview Preparation Guide
**10,000+ words covering:**
- 30-second elevator pitch
- Detailed talking points by category
- 5-7 minute demo script
- 10+ common interview questions with model answers
- Technical deep-dives (JWT vs sessions, MongoDB design, scaling)
- "What would you improve?" framework
- Interview scoring rubric

👉 **Read this before technical interviews**

---

## 🔌 API Endpoints

### Authentication
- `POST /api/doctors/register` — Register new doctor
- `POST /api/doctors/login` — Doctor login

### Doctors (Protected)
- `GET /api/doctors/me` — Get current doctor profile
- `PUT /api/doctors/me` — Update doctor profile
- `GET /api/doctors` — Get all doctors (admin only)

### Appointments
- `POST /api/appointments` — Create appointment
- `GET /api/appointments` — Get appointments (with filters)
- `PATCH /api/appointments/:id/status` — Update appointment status

### Health
- `GET /health` — Server health check

---

## 🧪 Testing (Future Enhancement)

**Planned Testing Strategy**:
- Unit tests with Jest
- Integration tests with Supertest
- Component tests with React Testing Library
- E2E tests with Cypress

*Currently in development — prioritized documentation for interview prep.*

---

## 🔒 Security Features

✅ **Implemented**:
- JWT authentication with token expiry
- Password hashing with bcrypt
- Role-based authorization middleware
- CORS configuration
- Environment variable management

⚠️ **Production Enhancements Needed**:
- Input validation on backend (Zod)
- Rate limiting (express-rate-limit)
- Input sanitization (express-mongo-sanitize)
- Security headers (Helmet.js)
- HTTPS enforcement

---

## 🚀 Deployment (Future)

**Planned Infrastructure**:
- Docker containerization
- Kubernetes orchestration
- CI/CD with GitHub Actions
- MongoDB Atlas for database
- AWS/Azure for hosting
- CloudFront/Cloudflare CDN

---

## 📈 Roadmap

**Short-term**:
- [ ] Add comprehensive tests (Jest, Supertest, RTL)
- [ ] Implement email notifications (Nodemailer)
- [ ] Add backend input validation (Zod)
- [ ] Create .env.example files

**Medium-term**:
- [ ] Real-time notifications (WebSockets)
- [ ] Video consultation integration
- [ ] Advanced analytics dashboard
- [ ] Patient file uploads (AWS S3)

**Long-term**:
- [ ] Microservices architecture
- [ ] Mobile app (React Native)
- [ ] CI/CD pipeline
- [ ] Production monitoring (Sentry, Grafana)

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Full-stack development (frontend + backend + database)
- ✅ TypeScript proficiency across the stack
- ✅ RESTful API design with authentication
- ✅ State management patterns (Zustand)
- ✅ Form handling and validation (React Hook Form + Zod)
- ✅ Database modeling with Mongoose
- ✅ Security best practices (JWT, bcrypt, CORS)
- ✅ Modern tooling (Vite, ESLint, PostCSS)

---

## 🤝 Contributing

This is a portfolio/interview project. Feedback and suggestions welcome!

---

## 📝 License

This project is for educational and portfolio purposes.

---

## 👨‍💻 Author

Created as a full-stack portfolio project to demonstrate modern web development skills for technical interviews.

**Contact**: [Your Name] • [Your Email] • [LinkedIn] • [GitHub]

---

## ⭐ Interview Highlights

**Why This Project is Interview-Ready**:
1. ✅ Modern, in-demand tech stack (React 18, TypeScript, Node.js, MongoDB)
2. ✅ Real-world use case with complex domain logic
3. ✅ Production patterns (middleware, error handling, auth)
4. ✅ Comprehensive documentation (PROJECT.md + INTERVIEW.md)
5. ✅ Clean code structure and separation of concerns
6. ✅ Security-conscious design
7. ✅ Scalability considerations

**Demo Time**: 5-7 minutes for full walkthrough

**Tech Talking Points**: JWT authentication, role-based access, MongoDB schema design, React state management, TypeScript type safety

---

## 📞 Quick Commands Reference

```powershell
# Start backend
cd backend
npm run dev

# Start frontend
npm run dev

# Seed sample doctors
cd backend
npm run seed:doctors

# Build for production
npm run build                # Frontend
cd backend && npm run build  # Backend

# Lint code
npm run lint
```

---

## 🎯 Next Steps

1. **For Development**: Read [PROJECT.md](./PROJECT.md) for complete technical documentation
2. **For Interviews**: Read [INTERVIEW.md](./INTERVIEW.md) and practice the demo script
3. **To Run**: Follow Quick Start above
4. **To Deploy**: See Deployment section in PROJECT.md

---

**Built with ❤️ and lots of ☕**

*Showcasing modern full-stack development for technical interviews*
