import { ColumnType } from "antd/es/table";
import { DataIndex } from "../model/types/DataIndex";
import React, { useRef, useState } from "react";
import { Review } from "@/entities/Review";
import { Button, Input, InputRef } from "antd";
import { FilterConfirmProps } from "antd/es/table/interface";
import { useTranslation } from "react-i18next";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { getTableSearchState } from "../model/selectors/getTableSearchState";
import { getSetTableSearchState } from "../model/selectors/getSetTableSearchState";

export const ColumnSearch = (dataIndex: DataIndex) => {
    const searchText = getTableSearchState()
    const setSearchText = getSetTableSearchState()
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const {t} = useTranslation()

    const handleSearch = (
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
        selectedText?: string,
    ) => {
        setSearchText(selectedText || '');
        setSearchedColumn(dataIndex);
        confirm({ closeDropdown: false });
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Review> => ({
    
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => (

            <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()} >
                <Input
                    ref={searchInput}
                    placeholder={t(`Search ${dataIndex}`) as string}
                    value={selectedKeys[0]}
                    onChange={e => {
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                        handleSearch(confirm, dataIndex, e.target.value)
                    }}
                    onPressEnter={() => close()}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Button
                    onClick={() => {
                        setSelectedKeys([])
                        handleSearch(confirm, dataIndex)
                    }}
                    size="small"
                    style={{ width: 90 }}
                >
                    {t('Reset')}
                </Button>
            </div>
        ),

        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
    
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
    
        onFilterDropdownOpenChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
        });

    return getColumnSearchProps(dataIndex)
}
