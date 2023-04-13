export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    REVIEWS = 'reviews',
    REVIEWS_DETAILS = 'reviews_details',
    REVIEWS_CREATE = 'reviews_create',
    REVIEWS_EDIT = 'reviews_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',

    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteReviews = () => '/reviews';
export const getRouteReviewDetails = (id: string) => `/reviews/${id}`;
export const getRouteReviewCreate = () => '/reviews/new';
export const getRouteReviewEdit = (id: string) => `/reviews/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
