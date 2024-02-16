import React from 'react';
import { useAuthState } from './auth';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthenticatedRoute = () => {
    const { user, loading, userRoles } = useAuthState();

    return loading ? (
        <div>Loading...</div>
    ) : user ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
};


