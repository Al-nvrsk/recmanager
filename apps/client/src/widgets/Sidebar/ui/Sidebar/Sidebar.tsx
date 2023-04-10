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
>
        <div className={cls.Sidebar}>
            sidebar
        </div>
        </Sider>
    )
})


  




//         <Button
//             data-testid="sidebar-toggle"
//             type="button"
//             onClick={onToggle}
//             className={cls.collapseBtn}
//             theme={ButtonTheme.BACKGROUND_INVERTED}
//             square
//             size={ButtonSize.L}
//         >
//             {collapsed ? '>' : '<'}
//         </Button>
//             {SidebarItemList.map((item) => (
//                 <SideBarItem
//                     item={item}
//                     key={item.path}
//                     collapsed={collapsed}
//                 />
//             ))}
// );
