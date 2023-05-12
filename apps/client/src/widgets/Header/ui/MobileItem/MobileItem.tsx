import { LangSwitcher } from "@/features/LangSwitcher"
import { ThemeSwitcher } from "@/features/ThemeSwitcher"
import { LoginOutlined, MenuUnfoldOutlined, SettingOutlined } from "@ant-design/icons"
import { Drawer, Space, Typography } from "antd"
import React, { memo, useCallback, useState } from "react"
import cls from './MobileItem.module.scss'
import { getCurrentUser, getIsAuth } from "@/entities/User"
import { useTranslation } from "react-i18next"
import { NavigationMenu } from "@/features/NavigationMenu"

const {Text} = Typography

interface MobileItemProps {
    onSignIn: () => void
}

export const MobileItem = memo((props:MobileItemProps) => {
    const {onSignIn} = props
    const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
    const [isSettingDrawerOpen, setIsSettingDrawerOpen] = useState(false)
    const isAuth = getIsAuth()
    const user = getCurrentUser()
    const {t} = useTranslation()
    
    const onSelectInNavDrawer = useCallback(() => {
        setIsNavDrawerOpen(prev => !prev)
    }, [])

    return (
        <>
            <Text>
                <Space direction={'horizontal'} size={'middle'}>
                    <MenuUnfoldOutlined style={{fontSize: '30px'}} onClick={() => setIsNavDrawerOpen(true)} />
                    <SettingOutlined style={{fontSize: '30px'}} onClick={() => setIsSettingDrawerOpen(true)}/>
                    {!isAuth && <LoginOutlined style={{fontSize: '30px'}}  onClick={onSignIn} /> }
                </Space>
            </Text>
            
            <Drawer
                title={t("Navigation")}
                placement={'bottom'}
                closable={true}
                onClose={() => setIsNavDrawerOpen(false)}
                open={isNavDrawerOpen}
                key={'bottom'}
                className={cls.navigationDrawer}
            >
                <NavigationMenu onSelect={onSelectInNavDrawer} isCollapsed={false} />            
            </Drawer>
            <Drawer
                
                title={t("Settings")}
                placement={'top'}
                closable={true}
                onClose={() => setIsSettingDrawerOpen(false)}
                open={isSettingDrawerOpen}
                key={'top'}
                size={'default'}
            >
                <div className={cls.optionsDrawer}>
                    <LangSwitcher />
                    <ThemeSwitcher />
                </div>
            </Drawer>
        </>
    )
})
