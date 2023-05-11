import * as React from 'react'
import cls from './Sidebar.module.scss'
import { memo, useCallback, useState } from 'react'
import Sider from 'antd/es/layout/Sider';
import { NavigationMenu } from '@/features/NavigationMenu';

export const Sidebar = memo(() => {
    const [isCollapsed, setIsCollapsed] = useState(true)

    const onCollapsed = useCallback(() => {
        setIsCollapsed(prev=>!prev)
    }, [])

    const onBreakpoint = useCallback(() => {
        if (!isCollapsed) {
            setIsCollapsed(true)
        }
    }, [isCollapsed])

    return (
        <Sider
            width={300}
            collapsedWidth={80}
            collapsed={isCollapsed}
            collapsible
            onCollapse={onCollapsed}
            breakpoint={'md'}
            onBreakpoint={onBreakpoint}
            theme='light'
        >
            <NavigationMenu isCollapsed={isCollapsed} />
        </Sider>
    )
})
