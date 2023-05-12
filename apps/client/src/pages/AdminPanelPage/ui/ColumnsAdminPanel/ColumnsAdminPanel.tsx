import { ColumnSearch } from "@/entities/Table";
import { Avatar,Popconfirm, Select, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import React from "react";
import {  useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { getRouteReviewDetails, getRouteReviews } from "@/shared/const/router";
import { UserRole } from "common-files";
import { AdminPanelColumnType } from "../../model/types/AdminPanelColumnType";
import cls from './ColumsAdminPanel.module.scss'

interface ColumnsAdminPanelProps {
    filteredInfo: Record<string, FilterValue | null>,
    allUserState: AdminPanelColumnType[]
    onChangeUserRole: (newRole: UserRole, id: string) => void,
    onDeleteUser: (id: string) => void
}

export const ColumnsAdminPanel = (props: ColumnsAdminPanelProps) => {
    const {filteredInfo, allUserState, onChangeUserRole, onDeleteUser} = props
    const {t} = useTranslation()
    const navigate = useNavigate()

    type ColumnFilterProps = 'likesCount' | 'commentCount' | 'reviewsCount' | 'role'
    
    const columnFilter = (columnValue: ColumnFilterProps) => {
        return [...new Set(allUserState?.map(user => user[columnValue]))].map(value => {return{text:t(value?.toString()), value}})
    }

    const onOpen = (id: string) => {
        navigate(getRouteReviewDetails(id))
    }

    const columns: ColumnsType<AdminPanelColumnType> = [
    {
        title: t("#"),
        dataIndex: "id",
        key: "id",
        render: (id, record, index) => { ++index; return index; },
        align:'center',
        responsive: ['sm']
    },
    {
        title: t("email"),
        dataIndex: "email",
        key: "email",
        filteredValue: filteredInfo.email || null,
        ...ColumnSearch("email")
    },
    {
        title: t('login'),
        dataIndex: 'login',
        key: 'login',
        filteredValue: filteredInfo.login || null,
        ...ColumnSearch('login')
    },
    {
        title: t('Avatar'),
        dataIndex: 'avatar',
        key: 'avatar',
        render: (avtr => (
            <Avatar key={avtr} src={avtr} />
        ))
    },
    {
        title: t('Role'),
        dataIndex: 'role',
        key: 'role',
        filters: columnFilter('role'),
        filteredValue: filteredInfo.role || null,
        onFilter: (value, record) => record.role === value,
        align:'center',
        render: ((role, record) => (
            <Select
                defaultValue={role}
                style={{ width: 120 }}
                bordered={false}
                onChange={(e) => onChangeUserRole(e, record.id)}
                options={[
                    {
                        value: UserRole.ADMIN,
                        label: UserRole.ADMIN,
                    },
                    {
                        value: UserRole.USER,
                        label: UserRole.USER,
                    },
                ]}
            />
        ))
    },
    {
        title: t("Reviews Count"),
        dataIndex: "reviewsCount",
        key: "reviewsCount",
        sorter: (a, b) => a.reviewsCount - b.reviewsCount,
        align:'center',
        filters: columnFilter("reviewsCount"),
        filteredValue: filteredInfo.reviewsCount || null,
        onFilter: (value, record) => record.reviewsCount === value,
        responsive: ['md']
    },
    {
        title: t("Comment Count"),
        dataIndex: "commentCount",
        key: "commentCount",
        sorter: (a, b) => a.commentCount - b.commentCount,
        align:'center',
        filters: columnFilter("commentCount"),
        filteredValue: filteredInfo.commentCount || null,
        onFilter: (value, record) => record.commentCount === value,
        responsive: ['sm']
    },
    {
        title: t("Likes Count from users"),
        dataIndex: "likesCount",
        key: "likesCount",
        sorter: (a, b) => a.likesCount - b.likesCount,
        align:'center',
        filters: columnFilter("likesCount"),
        filteredValue: filteredInfo.likesCount || null,
        onFilter: (value, record) => record.likesCount === value,
        responsive: ['sm']
    },
    {
        title: t('Action'),
        key: 'action',
        align:'center',
        render: (record) => (
            <Space key={'space' + record.id} size="middle">
                <Link 
                    key={'open'+ record.id}
                    to={getRouteReviews()}
                    state={{id:record.id}}
                    onClick={() => onOpen(record.id)}
                >
                    {t("Open reviews list")}
                </Link>
                <Popconfirm
                        key={'delete'+ record.id}
                        title={t('Are you sure?')}
                        okText={t('Yes')}
                        cancelText={t('No')}
                        onConfirm = {()=>onDeleteUser(record.id)}
                    >
                        <a 
                            href="#"
                            onClick={e => e.preventDefault()} 
                            className={cls.delete}
                        >
                            {t('Delete')}
                        </a>
                    </Popconfirm>
            </Space>
        ),
    },
];
return columns
}
