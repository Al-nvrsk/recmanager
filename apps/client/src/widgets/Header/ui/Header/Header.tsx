import React from "react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import cls from './Header.module.scss'
import {ReactComponent as Img}  from '@/shared/assets/logo.svg'
import { Avatar, Dropdown, MenuProps, Space, Typography } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { AuthModal } from "@/features/Auth/ui/AuthModal/AuthModal";
import { getCurrentUser, getIsAuth, getSetCurrentUser, getSetIsLoggedIn} from "@/entities/User";
import { trpc } from "@/shared/hooks/trpc/trpc";
import { DropdownItems } from "../DropdownItems/DropdownItems";
const { Title } = Typography;

export const Header = memo(() => {
    const [isOpen, setIsOpen] = useState(false)
    const setCurrentUser = getSetCurrentUser()
    const {t} = useTranslation()
    const isAuth = getIsAuth()
    const logout = trpc.logout.useMutation()
    const currentUser = getCurrentUser()
    const setIsLoggedIn = getSetIsLoggedIn()

    const onClose = () => {
        setIsOpen(false)
    }

    const onSignIn = () => {
        setIsOpen(true)
    }

    const onClickOut = async () => {
        await logout.mutateAsync()
        setCurrentUser()
        setIsLoggedIn(false)
        
    }

    const items = DropdownItems(currentUser?.id, onClickOut)

    return (
        <div className={cls.Header}>
            <Img className={cls.image} />
            <div>
            <ThemeSwitcher />
            
            <Space size={'small'}>
            <LangSwitcher />
                {!isAuth 
                    ? <Title className={cls.title} level={4} onClick={onSignIn}>
                        {t('Sign in')}    
                        </Title>
                
                : <Dropdown menu={{ items }} placement="bottomRight" arrow>
                    
                    <Avatar
                        className={cls.avatar}
                        size={48}
                        icon={<UserOutlined />}
                        src={currentUser?.avatar}
                    />
                </Dropdown>
                }
            </Space>
            </div>
            <AuthModal isOpen={isOpen} onClose={onClose} formType={'auth'} />
        </div>
    );
});
