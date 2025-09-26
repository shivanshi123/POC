import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../utils/authUtils';
import "./login.css"

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ username: '', password: '' });
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

  // OAuth login handler
  const handleOAuthLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google'; // Backend OAuth endpoint
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            className="login-input"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-btn">Login (JWT)</button>
        </form>
        <button onClick={handleOAuthLogin} className="login-btn oauth-btn">
          Login with Google (OAuth)
        </button>
        {error && <div className="login-error">{error}</div>}
        <div className="login-footer">
          Secure unified authentication demo
        </div>
      </div>
    </div>
  );
};

export default Login;