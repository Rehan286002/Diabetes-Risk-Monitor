const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock database - replace with actual database in production
const users = {
  user: [
    { id: 1, username: 'patient1', password: 'patient123', role: 'user', name: 'John Doe' }
  ],
  admin: [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User' }
  ],
  hospital: [
    { id: 1, username: 'hospital1', password: 'hospital123', role: 'hospital', name: 'City Hospital' }
  ],
  insurance: [
    { id: 1, username: 'insurance1', password: 'insurance123', role: 'insurance', name: 'Health Insurance Co.' }
  ]
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  // Find user in the appropriate role array
  const userList = users[role];
  if (!userList) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  const user = userList.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role, name: user.name },
    SECRET_KEY,
    { expiresIn: '24h' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role
    }
  });
});

// Get user profile (protected route)
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Get diabetes risk data for user
app.get('/api/diabetes-risk', authenticateToken, (req, res) => {
  // Mock diabetes risk data
  const riskData = {
    riskLevel: 'Moderate',
    riskScore: 65,
    factors: [
      { name: 'Blood Glucose', value: 126, status: 'warning', unit: 'mg/dL' },
      { name: 'HbA1c', value: 6.2, status: 'normal', unit: '%' },
      { name: 'BMI', value: 28.5, status: 'warning', unit: 'kg/m²' },
      { name: 'Blood Pressure', value: '130/85', status: 'normal', unit: 'mmHg' }
    ],
    recommendations: [
      'Maintain a healthy diet low in sugar',
      'Exercise regularly (30 minutes daily)',
      'Monitor blood glucose levels weekly',
      'Schedule regular check-ups'
    ],
    lastUpdated: new Date().toISOString()
  };

  res.json(riskData);
});

// Get patients list (for admin and hospital)
app.get('/api/patients', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'hospital') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const patients = [
    { id: 1, name: 'John Doe', age: 45, riskLevel: 'Moderate', lastCheckup: '2026-02-20' },
    { id: 2, name: 'Jane Smith', age: 52, riskLevel: 'High', lastCheckup: '2026-02-18' },
    { id: 3, name: 'Bob Johnson', age: 38, riskLevel: 'Low', lastCheckup: '2026-02-25' }
  ];

  res.json(patients);
});

// Get insurance claims (for insurance role)
app.get('/api/claims', authenticateToken, (req, res) => {
  if (req.user.role !== 'insurance') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const claims = [
    { id: 1, patientName: 'John Doe', claimAmount: 5000, status: 'Pending', date: '2026-02-15' },
    { id: 2, patientName: 'Jane Smith', claimAmount: 8500, status: 'Approved', date: '2026-02-10' },
    { id: 3, patientName: 'Bob Johnson', claimAmount: 3200, status: 'Under Review', date: '2026-02-22' }
  ];

  res.json(claims);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
