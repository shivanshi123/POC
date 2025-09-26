import { useState } from 'react';
import { loginUser, logoutUser, getCurrentUser, isAuthenticated } from '../utils/authUtils';

export const useAuth = () => {
    const [user, setUser] = useState(isAuthenticated() ? getCurrentUser() : null);

    const login = async (username, password) => {
        try {
            const loggedInUser = await loginUser({ username, password });
            setUser(loggedInUser);
            return loggedInUser;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        logoutUser();
        setUser(null);
    };

    return { user, login, logout };
};