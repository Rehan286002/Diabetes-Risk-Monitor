import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roleConfig = {
    user: {
      title: 'Patient Login',
      icon: '�‍⚕️',
      color: '#ff4757',
      placeholder: { username: 'patient1', password: 'patient123' }
    },
    admin: {
      title: 'Admin Login',
      icon: '⚙️',
      color: '#ff6348',
      placeholder: { username: 'admin', password: 'admin123' }
    },
    hospital: {
      title: 'Hospital Login',
      icon: '🏥',
      color: '#ff5e57',
      placeholder: { username: 'hospital1', password: 'hospital123' }
    },
    insurance: {
      title: 'Insurance Login',
      icon: '💼',
      color: '#ff7675',
      placeholder: { username: 'insurance1', password: 'insurance123' }
    }
  };

  const config = roleConfig[role] || roleConfig.user;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const result = await login(formData.username, formData.password, role);
    
    if (result.success) {
      // Redirect based on role
      switch (role) {
        case 'user':
          navigate('/user-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'hospital':
          navigate('/hospital-dashboard');
          break;
        case 'insurance':
          navigate('/insurance-dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>
      
      <div className="login-container">
        <div className="login-box" style={{ borderTop: `4px solid ${config.color}` }}>
          <div className="login-header">
            <div className="login-icon" style={{ color: config.color }}>
              {config.icon}
            </div>
            <h1>{config.title}</h1>
            <p>Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={`e.g., ${config.placeholder.username}`}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={`e.g., ${config.placeholder.password}`}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              style={{ background: config.color }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Username: <code>{config.placeholder.username}</code></p>
            <p>Password: <code>{config.placeholder.password}</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
