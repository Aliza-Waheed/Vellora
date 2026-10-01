import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('vellora_token') || null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState('');

    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                try {
                    const userData = await api.getMe(token);
                    setUser(userData);
                } catch (err) {
                    console.warn('Session expired:', err.message);
                    logout();
                }
            }
            setLoading(false);
        };
        initAuth();
    }, [token]);

    const login = async (email, password) => {
        setAuthError('');
        try {
            const data = await api.login(email, password);
            localStorage.setItem('vellora_token', data.token);
            setToken(data.token);
            setUser(data.user);
            return data.user;
        } catch (err) {
            setAuthError(err.message);
            throw err;
        }
    };

    const register = async (userData) => {
        setAuthError('');
        try {
            const data = await api.register(userData);
            localStorage.setItem('vellora_token', data.token);
            setToken(data.token);
            setUser(data.user);
            return data.user;
        } catch (err) {
            setAuthError(err.message);
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('vellora_token');
        setToken(null);
        setUser(null);
    };

    // One-click demo login helpers
    const loginAsAdmin = async () => {
        return await login('admin@vellora.pk', 'admin123');
    };

    const loginAsCustomer = async () => {
        return await login('ayesha@gmail.com', 'ayesha123');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                authError,
                setAuthError,
                login,
                register,
                logout,
                loginAsAdmin,
                loginAsCustomer,
                isAdmin: user?.role === 'admin'
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
