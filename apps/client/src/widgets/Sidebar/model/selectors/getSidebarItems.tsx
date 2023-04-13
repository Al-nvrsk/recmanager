import { getRouteAbout, getRouteAdmin, getRouteMain, getRouteProfile, getRouteReviews } from "@/shared/const/router";
import { SidebarItemType } from "../../types/SidebarTypes";
import { useTranslation } from "react-i18next";
import { ContainerOutlined, CrownOutlined, DesktopOutlined, HomeOutlined, IdcardOutlined, PieChartOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import React, { memo } from "react";

// export const getSidebarItems = createSelector(getUserAuthData, (userData) => {


export const getSidebarItems = (fontSize: string) => {
    const {t} = useTranslation()
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
        },

        // if (userData) {
            //     sidebarItemList.push(
        {
            label:t('Profile Page'),
            key: getRouteProfile('1'), // TODO User ID
            icon: <IdcardOutlined style={{ fontSize }} />
        },
        {
            label:t('Reviews'),
            key: getRouteReviews(),
            icon: <ContainerOutlined style={{ fontSize }} />
        },
        {
            label:t('Admin panel'),
            key: getRouteAdmin(),
            icon: <CrownOutlined style={{ fontSize }} />
        },
            //     );
    // }

    ];

    return sidebarItemList;
}
