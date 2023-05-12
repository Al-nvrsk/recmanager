import React, { useCallback } from "react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import cls from './Header.module.scss'
import {ReactComponent as Img}  from '@/shared/assets/logo.svg'
import { Avatar, Dropdown, Space, Typography } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { getCurrentUser, getIsAuth, getSetCurrentUser, getSetIsLoggedIn} from "@/entities/User";
import { trpc } from "@/shared/hooks/trpc/trpc";
import { DropdownItems } from "../DropdownItems/DropdownItems";
import { isMobile } from "@/shared/const/isMobile";
import { useNavigate } from "react-router-dom";
import { getRouteMain } from "@/shared/const/router";
import { MobileItem } from "../MobileItem/MobileItem";
import { AuthModal } from "@/features/Auth";

const { Title, Text } = Typography;

export const Header = memo(() => {
    const [isOpen, setIsOpen] = useState(false)
    const setCurrentUser = getSetCurrentUser()
    const {t} = useTranslation()
    const isAuth = getIsAuth()
    const logout = trpc.logout.useMutation()
    const currentUser = getCurrentUser()
    const setIsLoggedIn = getSetIsLoggedIn()
    const navigate = useNavigate()

    const onClose = useCallback(() => {
        setIsOpen(false)
    }, [])

    const onSignIn = useCallback(() => {
        setIsOpen(true)
    }, [])

    const onClickOut = useCallback( async () => {
        await logout.mutateAsync()
        setCurrentUser(null)
        setIsLoggedIn(false)
    }, [])

    const items = DropdownItems(currentUser?.id, onClickOut)

    return (
        <div className={cls.Header}>
            <Img className={cls.image} onClick={() => navigate(getRouteMain())} />
                <div className={cls.headerBtn}>
                    {!isMobile() 
                    ?
                        <>
                            <Space size={'small'}>
                                <ThemeSwitcher />
                                <LangSwitcher />
                            
                            {!isAuth &&
                                <Title className={cls.title} level={4} onClick={onSignIn}>
                                    {t('Sign in')}    
                                    </Title>
                            }
                            </Space>
                        </>
                    :
                        <MobileItem onSignIn={onSignIn} />
                    }
                    
                    {isAuth &&
                        <Dropdown menu={{ items }} placement="bottomRight" arrow>
                            <Avatar
                                className={cls.avatar}
                                size={48}
                                icon={<UserOutlined />}
                                src={currentUser?.avatar}
                            />
                        </Dropdown>
                    }
                </div>
            <AuthModal isOpen={isOpen} onClose={onClose} formType={'auth'} />
        </div>
    );
});
