import { getRouteAbout, getRouteAdmin, getRouteMain, getRouteProfile, getRouteReviews } from "@/shared/const/router";
import { SidebarItemType } from "../../types/SidebarTypes";
import { useTranslation } from "react-i18next";
import { ContainerOutlined, CrownOutlined, DesktopOutlined, HomeOutlined, IdcardOutlined, PieChartOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import React, { memo } from "react";
import { UserRole, getCurrentUser, getIsAuth } from "@/entities/User";

// export const getSidebarItems = createSelector(getUserAuthData, (userData) => {


export const getSidebarItems = (fontSize: string) => {
    const userData = getCurrentUser()
    const {t} = useTranslation()
    const isAuth = getIsAuth()
    const sidebarItemList: SidebarItemType[] = [
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

        if (userData?.roles===UserRole.ADMIN) {
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
