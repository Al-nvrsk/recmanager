import { UserRole } from "@/entities/User";
import { AboutPage } from "@/pages/AboutPage";
import { AdminPanelPage } from "@/pages/AdminPanelPage";
import { ForbiddenPage } from "@/pages/ForbiddenPage";
import { MainPage } from "@/pages/MainPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { ReviewDetailsPage } from "@/pages/ReviewDetailsPage";
import { ReviewEditPage } from "@/pages/ReviewEditPage";
import { ReviewsPage } from "@/pages/ReviewsPage";
import { 
    AppRoutes,
    getRouteAbout,
    getRouteAdmin,
    getRouteForbidden,
    getRouteMain,
    getRouteProfile,
    getRouteReviewCreate,
    getRouteReviewDetails,
    getRouteReviewEdit,
    getRouteReviews
    } from "@/shared/const/router";
import { AppRouterProps } from "@/shared/types/router";
import React from "react";

export const routeConfig: Record<AppRoutes, AppRouterProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.REVIEWS]: {
        path: getRouteReviews(),
        element: <ReviewsPage />,
        authOnly: true,
    },
    [AppRoutes.REVIEWS_DETAILS]: {
        path: getRouteReviewDetails(':id'),
        element: <ReviewDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.REVIEWS_CREATE]: {
        path: getRouteReviewCreate(),
        element: <ReviewEditPage />,
        authOnly: true,
    },
    [AppRoutes.REVIEWS_EDIT]: {
        path: getRouteReviewEdit(':id'),
        element: <ReviewEditPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdmin(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [ UserRole.ADMIN],
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
