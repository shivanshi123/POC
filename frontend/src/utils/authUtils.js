import { jwtDecode } from 'jwt-decode';

// Normalize token key to 'jwt' everywhere
const TOKEN_KEY = 'jwt';

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export function isAuthenticated() {
    console.log("Checking authentication status", getToken());
  return !!getToken();
}

export async function getCurrentUser() {
  const token = getToken();
  if (!token) return null;
  const res = await fetch('http://localhost:5000/api/auth/current', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
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
    if (response.ok) return data;
    throw new Error(data.message || 'Registration failed');
};

export const logoutUser = () => {
    removeToken();
};