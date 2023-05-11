import { Suspense, memo, useState } from 'react';
import React from 'react';
import { Modal, Spin } from 'antd';
import { FormType } from '../../model/types/FormType';
import { AuthFormAsync } from '../AuthForm/AuthForm.async';

interface LoginModalProps {
    formType: FormType
    isOpen: boolean
    onClose: () => void
}

export const AuthModal = memo((props: LoginModalProps) => {
    const { formType, isOpen, onClose } = props
    
    return (
        <Modal
            open={isOpen}
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
})
