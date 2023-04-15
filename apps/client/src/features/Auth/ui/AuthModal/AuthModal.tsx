import { Suspense, useState } from 'react';
import React from 'react';
import { Modal, Spin } from 'antd';
import { FormType } from '../../model/types/FormType';
import { useNavigate } from 'react-router-dom';
import { getRouteMain } from '@/shared/const/router';
import { AuthFormAsync } from '../AuthForm/AuthForm.async';

interface LoginModalProps {
    formType: FormType
    isOpen: boolean
    onClose: () => void
}

export const AuthModal = (props: LoginModalProps) => {
    const { formType, isOpen, onClose } = props
    const navigate = useNavigate()
    
    return (
        <Modal
            open={isOpen}
            afterClose={() => navigate(getRouteMain())}
            destroyOnClose
            footer={null}
            onCancel={onClose}
            bodyStyle={{height: '100 vh'}}
            centered
        >
            <Suspense fallback={<Spin size="large" />}>
                <AuthFormAsync onClose={onClose} formType={formType} />
            </Suspense>
        </Modal>
    )
}
