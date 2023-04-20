import React from "react";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import cls from './Header.module.scss'
import {ReactComponent as Img}  from '@/shared/assets/logo.svg'
import { Avatar, Space, Typography } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { AuthModal } from "@/features/Auth/ui/AuthModal/AuthModal";
import { getIsAuth, getSetCurrentUser} from "@/entities/User";
import { trpc } from "@/shared/hooks/trpc";
const { Title } = Typography;

export const Header = memo(() => {
    const [isOpen, setIsOpen] = useState(false)
    const setCurrentUser = getSetCurrentUser()
    const {t} = useTranslation()
    const isAuth = getIsAuth()
    const logout = trpc.logout.useMutation()

    const onClose = () => {
        setIsOpen(false)
    }

    const onClickOpen = () => {
        setIsOpen(true)
    }

    const onClickOut = () => {
        setCurrentUser()
        logout.mutateAsync()
    }

    return (
        <div className={cls.Header}>
            <Img className={cls.image} />
            <ThemeSwitcher />
            <LangSwitcher />
            <Space size={'large'}>
                <Avatar size={48} icon={<UserOutlined />} />
                {isAuth
                    ? <Title className={cls.title} level={4} onClick={onClickOut}>
                        {t('Sign out')}    
                    </Title>
                    : <Title className={cls.title} level={4} onClick={onClickOpen}>
                            {t('Sign in')}    
                    </Title>
                }
            </Space>
            <AuthModal isOpen={isOpen} onClose={onClose} formType={'auth'} />
        </div>
    );
});
