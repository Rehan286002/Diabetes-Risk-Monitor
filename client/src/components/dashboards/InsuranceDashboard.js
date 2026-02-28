import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './MobileDashboard.css';

const InsuranceDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalClaims: 0,
    pending: 0,
    approved: 0,
    totalAmount: 0
  });

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock claims data
    const mockClaims = [
      { id: 1, patientName: 'John Doe', claimAmount: 5000, status: 'Pending', date: '2026-02-15' },
      { id: 2, patientName: 'Jane Smith', claimAmount: 8500, status: 'Approved', date: '2026-02-10' },
      { id: 3, patientName: 'Bob Johnson', claimAmount: 3200, status: 'Under Review', date: '2026-02-22' }
    ];
    
    setClaims(mockClaims);
    
    // Calculate stats
    const stats = {
      totalClaims: mockClaims.length,
      pending: mockClaims.filter(c => c.status === 'Pending').length,
      approved: mockClaims.filter(c => c.status === 'Approved').length,
      totalAmount: mockClaims.reduce((sum, c) => sum + c.claimAmount, 0)
    };
    setStats(stats);
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending': return 'badge-pending';
      case 'Approved': return 'badge-approved';
      case 'Under Review': return 'badge-review';
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
          <h2>💼 Insurance Portal</h2>
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
          <h1>Insurance Dashboard</h1>
          <p>Claims processing and management</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📄</div>
            <div className="stat-content">
              <h3>{stats.totalClaims}</h3>
              <p>Total Claims</p>
            </div>
          </div>
          <div className="stat-card moderate-risk">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
          </div>
          <div className="stat-card low-risk">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <h3>{stats.approved}</h3>
              <p>Approved</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>${stats.totalAmount.toLocaleString()}</h3>
              <p>Total Amount</p>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn btn-primary">📝 New Claim</button>
          <button className="btn btn-primary">🔍 Search Claims</button>
          <button className="btn btn-primary">📊 Generate Report</button>
        </div>

        <div className="card">
          <h3 className="card-title">Recent Claims</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Claim ID</th>
                  <th>Patient Name</th>
                  <th>Claim Amount</th>
                  <th>Status</th>
                  <th>Submission Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr key={claim.id}>
                    <td>#{claim.id.toString().padStart(5, '0')}</td>
                    <td>{claim.patientName}</td>
                    <td>${claim.claimAmount.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(claim.status)}`}>
                        {claim.status}
                      </span>
                    </td>
                    <td>{new Date(claim.date).toLocaleDateString()}</td>
                    <td>
                      <button className="btn-small btn-primary">Review</button>
                      {claim.status === 'Pending' && (
                        <button className="btn-small" style={{ marginLeft: '8px', background: '#2ecc71', color: 'white' }}>
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-box">
            <h4>📋 Processing Guidelines</h4>
            <ul className="action-list">
              <li>Verify patient information</li>
              <li>Check policy coverage</li>
              <li>Review medical documentation</li>
              <li>Assess claim validity</li>
            </ul>
          </div>
          <div className="info-box">
            <h4>⚡ Priority Claims</h4>
            <ul className="schedule-list">
              <li>Claim #00001 - High value claim</li>
              <li>Claim #00003 - Urgent case</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDashboard;
