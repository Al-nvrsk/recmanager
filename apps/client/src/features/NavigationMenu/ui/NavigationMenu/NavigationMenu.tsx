import { memo, useCallback, useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarIconSize } from '@/shared/const/SidebarIconSize';
import { isMobile } from '@/shared/const/isMobile';
import { NavigationMenuItems } from '../../model/NavigationMenuItems/NavigationMenuItems';

interface NavigationMenuProps {
    isCollapsed: boolean
    onSelect?: () => void
}

export const NavigationMenu = memo((props: NavigationMenuProps) => {
    const { isCollapsed, onSelect } = props
    const [current, setCurrent] = useState('1');
    const navigate = useNavigate()
    const items = NavigationMenuItems(SidebarIconSize)
    const location = useLocation();
    
    const onClick: MenuProps['onClick'] = useCallback((e: {key:string} ) => {
        navigate(e.key);
        setCurrent(e.key)
        onSelect?.()
    }, []);

    useEffect(() => {
        setCurrent(location.pathname)
    }, [location])

    return (
        <Menu
            theme={'light'}
            onClick={onClick}
            style={{
                width: !isMobile ? (isCollapsed ? 80 : 300) : '100%' ,
                border: 'none'
            }}
            selectedKeys={[current]}
            mode={ "inline"} 
            items={items}
        />
    );
});
