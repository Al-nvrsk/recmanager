import { useTranslation } from 'react-i18next';
import { Button, Space, Typography, Row, Col } from 'antd';
import * as React from 'react';
import { memo, useCallback } from 'react';

const { Title } = Typography;

export const ErrorStub = memo(() => {
    const { t } = useTranslation('translation');

    const reloadPage = useCallback(() => {
        location.reload();
    }, [])

    return (
        <Row justify="center" align="middle" className="auth-page" style={{ height: '100vh' }}>
            <Col className="auth-page__col">
                <Space direction="vertical" size="middle" style={{ display: 'flex' }} align={'center'}>
                    <Title level={2}>
                        {t('Unexpected error')}
                    </Title>
                    <Button 
                        type="primary"
                        onClick={reloadPage}
                    >
                        {t('Reload')}
                    </Button>
                </Space>
            </Col>
        </Row>
    );
})
