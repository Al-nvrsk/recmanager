import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import React from 'react';

const ForbiddenPage = memo(() => {
    const { t } = useTranslation('main');
    return (
        <div>
            {t('Access forbidden')}
        </div>
    );
});

export default ForbiddenPage;
