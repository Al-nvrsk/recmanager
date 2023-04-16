import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarIconSize } from '@/shared/const/SidebarIconSize';
import { showNetworkError } from '@/shared/components/showNetworkError/showNetworlError';
import toast from 'react-hot-toast';

interface SideBarItemProps {
    isCollapsed: boolean
}

export const SideBarItem = memo((props: SideBarItemProps) => {
    const { isCollapsed } = props
    const [current, setCurrent] = useState('1');
    const { t } = useTranslation();
    const navigate = useNavigate()
    const items = getSidebarItems(SidebarIconSize)

    const notify = () => toast('Here is your toast.')
    
    const onClick: MenuProps['onClick'] = e => {
        navigate(e.key);
        notify()
        setCurrent(e.key)
    };

    return (
        <Menu
            theme={'light'}
            onClick={onClick}
            style={{ width: isCollapsed ? 80 : 300  }}
            selectedKeys={[current]}
            mode={"inline"} // TODO: Horizontal for Mobile
            items={items}
        />
    );
});
