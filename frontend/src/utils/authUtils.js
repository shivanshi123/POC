import { jwtDecode } from 'jwt-decode';

export async function isAuthenticated() {
    try {
        const res = await fetch('http://localhost:5000/api/auth/current', {
            credentials: 'include' // send cookies!
        });
        return res.ok;
    } catch {
        return false;
    }
}

export async function getCurrentUser() {
    try {
        const res = await fetch('http://localhost:5000/api/auth/current', {
            method: 'GET',
            credentials: 'include'
        });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export const loginUser = async ({ username, password }) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include' // send cookies!
    });
    if (response.ok) {
        return await getCurrentUser();
    } else {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
    }
};

export const registerUser = async ({ username, password, role }) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
        credentials: 'include'
    });
    const data = await response.json();
    if (response.ok) return data;
    throw new Error(data.message || 'Registration failed');
};

export const logoutUser = async () => {
    await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });
};