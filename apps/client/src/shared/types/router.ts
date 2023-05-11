import { UserRole } from 'common-files';
import { RouteProps } from 'react-router-dom';

export type AppRouterProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole;
};
