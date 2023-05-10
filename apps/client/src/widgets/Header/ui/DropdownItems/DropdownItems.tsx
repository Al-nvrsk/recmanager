import { getRouteProfile, getRouteReviews } from "@/shared/const/router";
import { MenuProps } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const DropdownItems = ( id: string ='', onClickOut: () => void ): MenuProps['items'] =>  {
    const { t } = useTranslation()
    
    const DropdownItems: MenuProps['items'] = [
            {
            key: '1',
            label: (
                <Title level={5} onClick={onClickOut}>
                    {t('Sign out')}    
                </Title>
            ),
        },
        {
            key: '2',
            label: (
                <Link to={getRouteProfile(id || '')} >
                    {t('Profile Page')}
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link to={getRouteReviews()} >
                    {t('My Reviews')}
                </Link>
            ),
        },
    ];
    return DropdownItems
}
