import * as React from 'react'
import cls from './Sidebar.module.scss'
import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Sider from 'antd/es/layout/Sider';

export const Sidebar = memo(() => {
    const { t } = useTranslation();
    const [isCollapsed, setIsCollapsed] = useState(false)

    const onCollapsed = () => {
        setIsCollapsed(prev=>!prev)
    }

    const onBreakpoint = () => {
        if (!isCollapsed) {
            setIsCollapsed(true)
        }
    }

    return (
        <Sider
            width={300}
            collapsedWidth={80}
            collapsed={isCollapsed}
            collapsible
            onClick={onCollapsed}
            breakpoint={'md'}
            onBreakpoint={onBreakpoint}
            theme='light'
>
        <div >
            sidebar
        </div>
        </Sider>
    )
})
