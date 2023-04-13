import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getRouteForbidden, getRouteMain } from '@/shared/const/router';
import React from 'react';
import { UserRole } from '@/entities/User';

interface RequireAuthProps {
    children: JSX.Element,
    roles?: UserRole
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
    // const auth = useSelector(getUserAuthData);
    const location = useLocation();
    // const userRoles = useSelector(getUserRoles);

    const hasRequiredRoles = useMemo(() => {
        if (roles !== UserRole.ADMIN) {
            return true;
        }
    },[roles])

    if (!auth) {
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
    }

    if (!hasRequiredRoles) {
        return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
    }

    return children;

}
