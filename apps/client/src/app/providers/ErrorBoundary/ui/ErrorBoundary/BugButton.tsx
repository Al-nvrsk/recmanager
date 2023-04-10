import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd'
import * as React from 'react';

// use for test Error Boundary
export const BugButton = () => {
    const [error, setError] = useState(false);
    const { t } = useTranslation('translation');
    const onThrow = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    return (
        <Button
            onClick={onThrow}
        >
            {t('throw error')}
        </Button>
    );
};
