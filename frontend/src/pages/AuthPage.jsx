import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser, registerUser } from '../utils/authUtils';
import './AuthPage.css';

const AuthPage = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    try {
      const u = await loginUser(form);
      setUser(u);
      history.push('/dashboard');
    } catch (err) {
      setError('Login failed');
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(form);
      setIsLogin(true);
    } catch (err) {
      setError('Registration failed');
    }
  };

  // OAuth login handler
  const handleOAuthLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google'; // Backend OAuth endpoint
  };

  // Handle token in URL after OAuth
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('jwt', token); // Store token
      setUser({ token }); // Or fetch user details from backend
      window.location.href = '/dashboard'; // Redirect to dashboard
    }
  }, [setUser]);

  return (
    <div className="authpage-background">
      <div className="authpage-container">
        <h1 className="authpage-title">Unified Security Auth</h1>
        <h2 className="authpage-subtitle">{isLogin ? 'Login' : 'Register'}</h2>
        <form className="authpage-form" onSubmit={isLogin ? handleLogin : handleRegister}>
          <input
            className="authpage-input"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            className="authpage-input"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <select
              className="authpage-select"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}
          <button type="submit" className="authpage-btn">
            {isLogin ? 'Login (JWT)' : 'Register'}
          </button>
        </form>
        <button onClick={handleOAuthLogin} className="authpage-btn oauth-btn">
          Login with Google (OAuth)
        </button>
        <div className="authpage-switch">
          <button className="authpage-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Create an account' : 'Back to login'}
          </button>
        </div>
        {error && <div className="authpage-error">{error}</div>}
        <div className="authpage-footer">
          Secure unified authentication demo
        </div>
      </div>
    </div>
  );
};

export default AuthPage;