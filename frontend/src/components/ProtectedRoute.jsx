import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { authState, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!authState.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

export default ProtectedRoute;
