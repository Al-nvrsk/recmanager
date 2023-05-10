import { useTranslation } from 'react-i18next';
import './ErrorPage.scss';
import React, { memo } from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { getRouteMain } from '@/shared/const/router';

interface ErrorPageProps {
    nameError: string;
    textError: string;
}

const ErrorPage = memo(({ nameError, textError }: ErrorPageProps) => {
    const { t } = useTranslation();
    
    return (
        <div className="error-page">
            <div className="error-page__text">
                <Typography.Title level={1} className="error-page__title">
                    {t(nameError)}
                </Typography.Title>
                <Typography className="error-page__subtitle">
                    {t(textError)}
                </Typography>
            </div>
            <Link className="error-page__link" to={getRouteMain()}>
                {t('Go to main')}
            </Link>
        </div>
    );
})



export default ErrorPage
