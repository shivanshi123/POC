import { jwtDecode } from 'jwt-decode';

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export function isAuthenticated() {
  return !!localStorage.getItem('jwt');
}

export async function getCurrentUser() {
  const token = localStorage.getItem('jwt');
  const res = await fetch('http://localhost:5000/api/auth/current', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return null;
  return await res.json();
}

export const loginUser = async ({ username, password }) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.token) {
        setToken(data.token);
        return await getCurrentUser();
    } else {
        throw new Error(data.message || 'Login failed');
    }
};

export const registerUser = async ({ username, password, role }) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
    });
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message || 'Registration failed');
    }
};

export const logoutUser = () => {
    removeToken();
};