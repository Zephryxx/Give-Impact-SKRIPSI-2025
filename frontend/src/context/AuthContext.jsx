import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        user: null,
        isAuthenticated: false,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token && user) {
            setAuthState({
                token,
                user,
                isAuthenticated: true,
            });
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setAuthState({
            token: token,
            user: userData,
            isAuthenticated: true,
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({
            token: null,
            user: null,
            isAuthenticated: false,
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};