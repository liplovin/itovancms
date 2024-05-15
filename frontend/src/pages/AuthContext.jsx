// AuthContext.js

import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [username, setUsername] = useState('');

    const login = (role, username) => {
        setIsAuthenticated(true);
        setUserRole(role);
        setUsername(username);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole('');
        setUsername('');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider; // Export AuthProvider as default
