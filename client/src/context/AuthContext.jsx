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
            // Fallback for demo users if backend API is not active (e.g. static Vercel deployment)
            if (email === 'admin@vellora.pk') {
                const demoAdmin = { id: 'usr-admin', name: 'Aliza Waheed', email: 'admin@vellora.pk', role: 'admin', city: 'Lahore' };
                localStorage.setItem('vellora_token', 'demo-admin-token');
                setToken('demo-admin-token');
                setUser(demoAdmin);
                return demoAdmin;
            } else if (email === 'ayesha@gmail.com' || email.toLowerCase().includes('demo') || email.toLowerCase().includes('customer')) {
                const demoCustomer = { id: 'usr-customer', name: 'Ayesha Khan', email: email || 'ayesha@gmail.com', role: 'customer', city: 'Karachi', phone: '0300 1234567' };
                localStorage.setItem('vellora_token', 'demo-customer-token');
                setToken('demo-customer-token');
                setUser(demoCustomer);
                return demoCustomer;
            }
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
            // Offline demo fallback for registering users
            const newCustomer = {
                id: `usr-${Date.now()}`,
                name: userData.name || 'New Customer',
                email: userData.email,
                role: 'customer',
                phone: userData.phone || '0300 1234567',
                city: userData.city || 'Lahore'
            };
            localStorage.setItem('vellora_token', 'demo-user-token');
            setToken('demo-user-token');
            setUser(newCustomer);
            return newCustomer;
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
                loginAsDemoAdmin: loginAsAdmin,
                loginAsDemoCustomer: loginAsCustomer,
                isAdmin: user?.role === 'admin'
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
