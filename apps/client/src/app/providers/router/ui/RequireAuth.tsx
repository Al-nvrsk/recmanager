import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getRouteForbidden, getRouteMain } from '@/shared/const/router';
import React from 'react';
import { getCurrentUser, getIsAuth } from '@/entities/User';
import { UserRole } from 'common-files';

interface RequireAuthProps {
    children: JSX.Element,
    roles?: UserRole
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
    const user = getCurrentUser();
    const location = useLocation();

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }
        if (roles === user?.role) {
            return true;
        }
    },[roles, user])

    if (!user) {
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
    }

    if (!hasRequiredRoles) {
        return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
    }

    return children;

}
