import { getRouteAbout, getRouteAdmin, getRouteMain, getRouteProfile, getRouteReviews } from "@/shared/const/router";
import { useTranslation } from "react-i18next";
import { ContainerOutlined, CrownOutlined, HomeOutlined, IdcardOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import React from "react";
import { getCurrentUser, getIsAuth } from "@/entities/User";
import { UserRole } from "common-files";
import { NavigationMenuItemTypes } from "../types/NavigationMenuItemTypes";

export const NavigationMenuItems = (fontSize: string) => {
    const userData = getCurrentUser()
    const {t} = useTranslation()
    const isAuth = getCurrentUser()
    const sidebarItemList: NavigationMenuItemTypes[] = [
        {
            label:t('Main Page'),
            key: getRouteMain(),
            icon: <HomeOutlined style={{ fontSize }} />
        },
        {
            label:t('About Page'),
            key: getRouteAbout(),
            icon: <QuestionCircleOutlined style={{ fontSize }} />
        }
    ]

        if (isAuth) {
            sidebarItemList.push(
                {
                    label:t('Profile Page'),
                    key: getRouteProfile(userData!.id),
                    icon: <IdcardOutlined style={{ fontSize }} />
                },
                {
                    label:t('My Reviews'),
                    key: getRouteReviews(),
                    icon: <ContainerOutlined style={{ fontSize }} />
                },
            );
        }

        if (userData?.role === UserRole.ADMIN) {
            sidebarItemList.push(
                {
                    label:t('Admin panel'),
                    key: getRouteAdmin(),
                    icon: <CrownOutlined style={{ fontSize }} />
                },
            )
        }

    return sidebarItemList;
}
