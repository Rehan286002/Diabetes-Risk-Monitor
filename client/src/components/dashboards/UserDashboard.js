import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './MobileDashboard.css';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiskData();
  }, []);

  const fetchRiskData = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock diabetes risk data
    const mockData = {
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
    
    setRiskData(mockData);
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRiskColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return '#2ecc71';
      case 'moderate': return '#f39c12';
      case 'high': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'normal': return 'badge-normal';
      case 'warning': return 'badge-warning';
      case 'danger': return 'badge-danger';
      default: return 'badge-normal';
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard mobile-dashboard">
      <div className="dashboard-rectangle-wrapper">
        <nav className="mobile-nav">
          <div className="nav-header">
            <div className="nav-avatar">
              <span className="avatar-text">{user?.name?.charAt(0) || 'U'}</span>
            </div>
            <div className="nav-info">
              <span className="greeting-text">Good Day!</span>
              <span className="user-name">{user?.name}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </nav>
        
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

      <div className="mobile-container">
        <div className="health-card-main">
          <div className="health-badge">
            <svg className="pulse-icon" width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#ff4757"/>
            </svg>
          </div>
          <h1 className="main-title">Diabetes Monitor</h1>
          <p className="main-subtitle">Track your health journey</p>
        </div>

        {riskData && (
          <>
            <div className="risk-card-beautiful">
              <div className="risk-top">
                <span className="risk-label-text">Your Risk Level</span>
              </div>
              <div className="risk-center">
                <div className="circular-progress">
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="#f0f0f0" strokeWidth="12"/>
                    <circle cx="80" cy="80" r="70" fill="none" stroke={getRiskColor(riskData.riskLevel)} 
                      strokeWidth="12" strokeLinecap="round"
                      strokeDasharray={`${(riskData.riskScore / 100) * 440} 440`}
                      transform="rotate(-90 80 80)"/>
                  </svg>
                  <div className="progress-content">
                    <div className="risk-score-num">{riskData.riskScore}</div>
                    <div className="risk-level-text" style={{ color: getRiskColor(riskData.riskLevel) }}>
                      {riskData.riskLevel}
                    </div>
                  </div>
                </div>
              </div>
              <div className="risk-bottom">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#999" strokeWidth="2"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="#999" strokeWidth="2"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="#999" strokeWidth="2"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="#999" strokeWidth="2"/>
                </svg>
                <span className="update-text">Updated {new Date(riskData.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="section-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <line x1="12" y1="2" x2="12" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="18" x2="12" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="2" y1="12" x2="6" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="18" y1="12" x2="22" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <h3 className="section-title-new">Vital Parameters</h3>
            </div>
            
            <div className="params-grid-modern">
              <div className="param-modern left">
                <div className="param-top-row">
                  <div className="param-icon-circle" style={{background: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className={`status-dot ${getStatusBadge(riskData.factors[0].status)}`}></span>
                </div>
                <div className="param-name">Blood Glucose</div>
                <div className="param-digits">{riskData.factors[0].value}</div>
                <div className="param-metric">{riskData.factors[0].unit}</div>
              </div>
              
              <div className="param-modern right">
                <div className="param-top-row">
                  <div className="param-icon-circle" style={{background: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="3" fill="white"/>
                      <line x1="12" y1="2" x2="12" y2="8" stroke="white" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span className={`status-dot ${getStatusBadge(riskData.factors[1].status)}`}></span>
                </div>
                <div className="param-name">HbA1c Level</div>
                <div className="param-digits">{riskData.factors[1].value}</div>
                <div className="param-metric">{riskData.factors[1].unit}</div>
              </div>
              
              <div className="param-modern left">
                <div className="param-top-row">
                  <div className="param-icon-circle" style={{background: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="2 17 12 22 22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="2 12 12 17 22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className={`status-dot ${getStatusBadge(riskData.factors[2].status)}`}></span>
                </div>
                <div className="param-name">Body Mass Index</div>
                <div className="param-digits">{riskData.factors[2].value}</div>
                <div className="param-metric">{riskData.factors[2].unit}</div>
              </div>
              
              <div className="param-modern right">
                <div className="param-top-row">
                  <div className="param-icon-circle" style={{background: 'linear-gradient(135deg, #55efc4 0%, #00b894 100%)'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className={`status-dot ${getStatusBadge(riskData.factors[3].status)}`}></span>
                </div>
                <div className="param-name">Blood Pressure</div>
                <div className="param-digits">{riskData.factors[3].value}</div>
                <div className="param-metric">{riskData.factors[3].unit}</div>
              </div>
            </div>

            <div className="section-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white"/>
              </svg>
              <h3 className="section-title-new">Health Recommendations</h3>
            </div>
            
            <div className="recommendations-modern">
              {riskData.recommendations.map((rec, index) => (
                <div key={index} className="rec-modern">
                  <div className="rec-icon-wrap">
                    {index === 0 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 2v7c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V2l-9-1-9 1z" fill="#4CAF50"/>
                      </svg>
                    )}
                    {index === 1 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#FF9800"/>
                        <path d="M9 12h3m0 0h3m-3 0V9m0 3v3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                    {index === 2 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="18" height="18" rx="2" fill="#2196F3"/>
                        <path d="M9 11l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {index === 3 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#9C27B0"/>
                        <path d="M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                  <p className="rec-content">{rec}</p>
                </div>
              ))}
            </div>
            
            <div className="action-btns-modern">
              <button className="modern-btn primary-modern">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Book Appointment</span>
              </button>
              <button className="modern-btn secondary-modern">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="currentColor"/>
                </svg>
                <span>Call Doctor</span>
              </button>
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default UserDashboard;
