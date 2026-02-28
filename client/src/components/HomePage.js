import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const loginOptions = [
    {
      role: 'user',
      title: 'Patient Login',
      description: 'Monitor your diabetes risk and health metrics',
      icon: '�‍⚕️',
      color: '#ff4757'
    },
    {
      role: 'admin',
      title: 'Admin Login',
      description: 'Manage system and monitor all activities',
      icon: '⚙️',
      color: '#ff6348'
    },
    {
      role: 'hospital',
      title: 'Hospital Login',
      description: 'Access patient records and manage treatments',
      icon: '🏥',
      color: '#ff5e57'
    },
    {
      role: 'insurance',
      title: 'Insurance Login',
      description: 'Review and process insurance claims',
      icon: '💼',
      color: '#ff7675'
    }
  ];

  return (
    <div className="homepage">
      <div className="homepage-container">
        <div className="top-header">
          <h1 className="main-title-center">❤️ Risk Diabetes Monitor</h1>
          <p className="subtitle-center">Comprehensive Diabetes Risk Management System</p>
        </div>

        <div className="login-boxes-container">
          {loginOptions.map((option) => (
            <div
              key={option.role}
              className="login-box-item"
              onClick={() => navigate(`/login/${option.role}`)}
            >
              <div className="login-box-icon">{option.icon}</div>
              <h3 className="login-box-title">{option.title}</h3>
              <p className="login-box-desc">{option.description}</p>
              <button className="login-box-btn">Login</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
