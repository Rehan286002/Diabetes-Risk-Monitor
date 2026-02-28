# 🏥 Risk Diabetes Monitor Dashboard

A comprehensive diabetes risk management system with role-based access control for Patients, Administrators, Hospitals, and Insurance providers.

## 🚀 Features

### Multi-Role Authentication System
- **Patient Login** - Monitor personal diabetes risk and health metrics
- **Admin Login** - System management and patient oversight
- **Hospital Login** - Patient records and treatment management
- **Insurance Login** - Claims processing and management

### Key Capabilities
- Real-time diabetes risk monitoring
- Comprehensive health metrics tracking
- Role-based dashboard views
- JWT-based secure authentication
- Responsive design for all devices
- Mock data API (ready for database integration)

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Axios for API calls
- CSS3 with animations
- Context API for state management

### Backend
- Node.js
- Express.js
- JWT for authentication
- CORS enabled
- RESTful API architecture

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

For development with auto-reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🔐 Demo Credentials

### Patient Login
- Username: `patient1`
- Password: `patient123`

### Admin Login
- Username: `admin`
- Password: `admin123`

### Hospital Login
- Username: `hospital1`
- Password: `hospital123`

### Insurance Login
- Username: `insurance1`
- Password: `insurance123`

## 📁 Project Structure

```
VS ADHI/
├── server/
│   ├── server.js          # Express server & API routes
│   └── package.json       # Backend dependencies
│
└── client/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── HomePage.js        # Landing page with login options
    │   │   ├── HomePage.css
    │   │   ├── Login.js           # Universal login component
    │   │   ├── Login.css
    │   │   └── dashboards/
    │   │       ├── UserDashboard.js
    │   │       ├── AdminDashboard.js
    │   │       ├── HospitalDashboard.js
    │   │       ├── InsuranceDashboard.js
    │   │       └── Dashboard.css
    │   ├── context/
    │   │   └── AuthContext.js     # Authentication state management
    │   ├── App.js                 # Main app with routing
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/login` - User authentication
  - Body: `{ username, password, role }`
  - Returns: JWT token and user data

### Protected Routes (Require JWT Token)
- `GET /api/profile` - Get user profile
- `GET /api/diabetes-risk` - Get diabetes risk data (User role)
- `GET /api/patients` - Get patients list (Admin & Hospital roles)
- `GET /api/claims` - Get insurance claims (Insurance role)

### Health Check
- `GET /api/health` - Server status

## 🎨 Dashboard Features

### Patient Dashboard
- Overall risk level display
- Health metrics monitoring (Blood Glucose, HbA1c, BMI, Blood Pressure)
- Personalized health recommendations
- Risk score visualization

### Admin Dashboard
- System statistics overview
- Complete patient registry
- Risk level distribution
- Patient management tools

### Hospital Dashboard
- Patient records management
- Treatment tracking
- Appointment scheduling
- Quick action menu

### Insurance Dashboard
- Claims processing
- Status tracking (Pending, Approved, Under Review)
- Financial statistics
- Priority claims management

## 🔒 Security Features

- JWT token-based authentication
- Protected routes with role-based access control
- Token stored in localStorage
- Automatic token validation
- Secure logout functionality

## 🚀 Deployment

### Backend Deployment
1. Set environment variables (PORT, SECRET_KEY)
2. Configure production database
3. Deploy to services like Heroku, Railway, or AWS

### Frontend Deployment
1. Build the production version:
```bash
npm run build
```
2. Deploy the `build` folder to Netlify, Vercel, or similar services

## 📝 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Real-time notifications
- [ ] Advanced data analytics
- [ ] Export reports (PDF/Excel)
- [ ] Two-factor authentication
- [ ] Email notifications
- [ ] Appointment booking system
- [ ] Medical record uploads
- [ ] Chat support
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Developer

Created with ❤️ for comprehensive diabetes risk management

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Note:** This is a demonstration application with mock data. For production use, implement proper database integration, enhanced security measures, and comply with healthcare data regulations (HIPAA, GDPR, etc.).
