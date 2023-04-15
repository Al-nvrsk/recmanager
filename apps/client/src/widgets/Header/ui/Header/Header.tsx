import React from "react";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import cls from './Header.module.scss'
import {ReactComponent as Img}  from '@/shared/assets/logo.svg'
import { Avatar, Select, Space, Typography } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { AuthModal } from "@/features/Auth/ui/AuthModal/AuthModal";
const { Title } = Typography;

export const Header = memo(() => {
    const [isOpen, setIsOpen] = useState(false)
    const {t} = useTranslation()

    const onClose = () => {
        setIsOpen(false)
    }

    const onClickOpen = () => {
        setIsOpen(true)
    }

    return (
        <div className={cls.Header}>
            <Img className={cls.image} />
            <ThemeSwitcher />
            <LangSwitcher />
            <Space size={'large'}>
                <Avatar size={48} icon={<UserOutlined />} />
                <Title className={cls.title} level={4} onClick={onClickOpen}>
                    {t('Sign in')}    
                </Title>
            </Space>
            <AuthModal isOpen={isOpen} onClose={onClose} formType={'auth'} />
        </div>
    );
});
