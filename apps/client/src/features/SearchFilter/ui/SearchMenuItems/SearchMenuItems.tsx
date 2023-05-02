import { workType } from "@/shared/const/workType";
import { SelectWithFilter } from "@/shared/ui/SelectWithFilter/SelectWithFilter";
import { FieldTimeOutlined, SearchOutlined, StockOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { getSetSearchWorkType } from "../../model/selectors/getSetSearchWorktype";
import { getSearchWorkType } from "../../model/selectors/getSearchWorkType";
import { MenuItemKey } from "common-types";

export const SearchMenuItems  = ():MenuProps['items'] => {
    const {t} = useTranslation()
    const setWorkType = getSetSearchWorkType()
    const searchWorkType = getSearchWorkType()
    
    return (
        [
            {
                label: t('Last added'),
                key: MenuItemKey.ADDED,
                icon: <FieldTimeOutlined />,
            },
            {
                label: t('Most popular'),
                key: MenuItemKey.POPULAR,
                icon: <StockOutlined />,
            },
            {
                label: t('Search'),
                key: MenuItemKey.SEARCH,
                icon: <SearchOutlined />,
            },
            {
                key: MenuItemKey.SELECT,
                icon: <SelectWithFilter 
                        value={searchWorkType}
                        onChange={setWorkType}
                        options={workType()} 
                        placeholder={t('Search type of work')}
                        styleProps={{width: "250px"}} />,
                children: []
            },
        ]
    )
}
