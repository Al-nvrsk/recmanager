import { Input, Menu, MenuProps, Select, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { SearchMenuItems } from "../SearchMenuItems/SearchMenuItems";
import cls from './SearchFilter.module.scss'
import { isMobile } from "@/shared/const/isMobile";
import { MenuItemKey } from "../../model/consts/menuItemKey";
import { getSetSearchText } from "../../model/selectors/getSetSearchText";
import { getSetCurrentMenuKey } from "../../model/selectors/getSetCurrentMenyKey";
import { getCurrentMenuKey } from "../../model/selectors/getCurrentMenuKey";
import { getSearchText } from "../../model/selectors/getSearchText";

const { Search } = Input;

export const SearchFilter = () => {
    const {t} = useTranslation()
    const setSearchText = getSetSearchText()
    const setCurrentMenuKey = getSetCurrentMenuKey()
    const currentMenuKey = getCurrentMenuKey()
    const searchText = getSearchText()
    
    const onSearch = (inputText: string) => {
        setSearchText(inputText)
    } 

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key === MenuItemKey.SELECT) {
            return
        }
        setCurrentMenuKey(e.key as MenuItemKey);
    };

    return (
        <>
            <Space direction={'vertical'} style={{width: '100%'}} size={'middle'} >
            <Menu 
                className={cls.searchFilter}
                onClick={onClick}
                selectedKeys={[currentMenuKey]}
                mode="horizontal"
                items={SearchMenuItems()}
            />
                {currentMenuKey === MenuItemKey.SEARCH &&
                    <div className={cls.search}>
                    <Search 
                        placeholder={t('Input words for search') as string} 
                        loading={false}
                        enterButton onSearch={onSearch}
                        allowClear={true}
                    />
                    </div>
                }
            </Space>
        </>
    )
}
