import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './MobileDashboard.css';

const HospitalDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock patient data
    const mockPatients = [
      { id: 1, name: 'John Doe', age: 45, riskLevel: 'Moderate', lastCheckup: '2026-02-20' },
      { id: 2, name: 'Jane Smith', age: 52, riskLevel: 'High', lastCheckup: '2026-02-18' },
      { id: 3, name: 'Bob Johnson', age: 38, riskLevel: 'Low', lastCheckup: '2026-02-25' }
    ];
    
    setPatients(mockPatients);
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRiskBadge = (level) => {
    switch (level) {
      case 'Low': return 'badge-low';
      case 'Moderate': return 'badge-moderate';
      case 'High': return 'badge-high';
      default: return 'badge-normal';
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>🏥 Hospital Portal</h2>
        </div>
        <div className="nav-user">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
      </nav>

      <div className="dashboard-container">
        <div className="user-credentials-card">
          <div className="credential-row">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="cred-icon">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#ff4757" strokeWidth="2" fill="none"/>
              <polyline points="22,6 12,13 2,6" stroke="#ff4757" strokeWidth="2" fill="none"/>
            </svg>
            <span className="cred-label">Email:</span>
            <span className="cred-value">{user?.email}</span>
          </div>
          <div className="credential-row">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="cred-icon">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#ff4757" strokeWidth="2" fill="none"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#ff4757" strokeWidth="2" fill="none"/>
            </svg>
            <span className="cred-label">Password:</span>
            <span className="cred-value">{'•'.repeat(user?.password?.length || 8)}</span>
          </div>
        </div>
        
        <div className="dashboard-header">
          <h1>Hospital Dashboard</h1>
          <p>Patient records and treatment management</p>
        </div>

        <div className="action-buttons">
          <button className="btn btn-primary">➕ Add New Patient</button>
          <button className="btn btn-primary">📅 Schedule Appointment</button>
          <button className="btn btn-primary">📊 Generate Report</button>
        </div>

        <div className="card">
          <h3 className="card-title">Patient Records</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Risk Level</th>
                  <th>Last Checkup</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>#{patient.id.toString().padStart(4, '0')}</td>
                    <td>{patient.name}</td>
                    <td>{patient.age} years</td>
                    <td>
                      <span className={`badge ${getRiskBadge(patient.riskLevel)}`}>
                        {patient.riskLevel}
                      </span>
                    </td>
                    <td>{new Date(patient.lastCheckup).toLocaleDateString()}</td>
                    <td>
                      <button className="btn-small btn-primary">View</button>
                      <button className="btn-small btn-primary" style={{ marginLeft: '8px' }}>
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-box">
            <h4>🩺 Quick Actions</h4>
            <ul className="action-list">
              <li>Record patient vitals</li>
              <li>Update treatment plan</li>
              <li>Schedule follow-up</li>
              <li>Request lab tests</li>
            </ul>
          </div>
          <div className="info-box">
            <h4>📋 Today's Schedule</h4>
            <ul className="schedule-list">
              <li>9:00 AM - John Doe (Follow-up)</li>
              <li>10:30 AM - Jane Smith (New Patient)</li>
              <li>2:00 PM - Bob Johnson (Consultation)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
