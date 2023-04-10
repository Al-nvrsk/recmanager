import { useTranslation } from 'react-i18next';
import { Button, Space, Typography, Row, Col } from 'antd';
import * as React from 'react';

const { Title, Paragraph } = Typography;

const reloadPage = () => {
    location.reload();
};

export const ErrorStub = () => {
    const { t } = useTranslation('translation');
    return (
        <Row justify="center" align="middle" className="auth-page" style={{ height: '100vh' }}>
        <Col className="auth-page__col">
            <Space direction="vertical" size="middle" style={{ display: 'flex' }} align={'center'}>
            <Title level={2}>{t('Unexpected error')}</Title>
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
};
