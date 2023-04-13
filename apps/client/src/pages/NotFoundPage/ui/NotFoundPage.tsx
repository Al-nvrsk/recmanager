import { useTranslation } from 'react-i18next';
// import { Page } from '@/widgets/Page';
// import cls from './NotFoundPage.module.scss';
import React, { memo } from 'react';

const NotFoundPage = memo(() => {
    const { t } = useTranslation();
    return (
        <div >
            {t('Page not found')}
        </div>
    );
})

export default NotFoundPage
