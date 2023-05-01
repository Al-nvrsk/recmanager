import { Review, getReviewsState, getSetReviewEditState } from "@/entities/Review";
import { ColumnSearch } from "@/entities/Table";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import dayjs from "dayjs";
import React from "react";
import { getInitialProps, useTranslation } from "react-i18next";
import { additionActions } from "../AdditionActions/AdditionActions";
import { useNavigate } from "react-router-dom";
import { getRouteReviewDetails } from "@/shared/const/router";

interface ColumnProps {
    deleteReview: {
        mutate: ({ id }: { id: string }) => void
    }
    filteredInfo: Record<string, FilterValue | null>
}

export const Columns = (props: ColumnProps) => {
    const {filteredInfo, deleteReview} = props
    const {t} = useTranslation()
    const reviewState = getReviewsState()
    const setReviewEditState = getSetReviewEditState()
    const navigate = useNavigate()

    type ColumnFilterProps = 'TypeOfWork' | 'AuthRating' | 'rating'
    const columnFilter = (columnValue: ColumnFilterProps) => {
        return [...new Set(reviewState?.map(review => review[columnValue]))].map(value => {return{text:t(value?.toString()), value}})
    }

    const onOpen = (id: string) => {
        navigate(getRouteReviewDetails(id))
    }

    const columns: ColumnsType<Review> = [
    {
        title: t("#"),
        dataIndex: "id",
        key: "id",
        render: (id, record, index) => { ++index; return index; },
        align:'center',
        responsive: ['sm']
    },
    {
        title: t("Review Name"),
        dataIndex: "ReviewName",
        key: "ReviewName",
        filteredValue: filteredInfo.ReviewName || null,
        ...ColumnSearch("ReviewName")
    },
    {
        title: t('Title of work'),
        dataIndex: 'TitleOfWork',
        key: 'TitleOfWork',
        filteredValue: filteredInfo.TitleOfWork || null,
        ...ColumnSearch('TitleOfWork')
    },
    {
        title: t('Type of work'),
        dataIndex: 'TypeOfWork',
        key: 'TypeOfWork',
        filters: columnFilter('TypeOfWork'),
        filteredValue: filteredInfo.TypeOfWork || null,
        onFilter: (value, record) => record.TypeOfWork.indexOf(value as string) === 0,
    },
    {
        title: t("My assessment"),
        dataIndex: "AuthRating",
        key: "AuthRating",
        sorter: (a, b) => a.AuthRating - b.AuthRating,
        align:'center',
        filters: columnFilter("AuthRating"),
        filteredValue: filteredInfo.AuthRating || null,
        onFilter: (value, record) => record.AuthRating === value,
        responsive: ['md']
    },
    {
        title: t("Users assessment"),
        dataIndex: "rating",
        key: "rating",
        sorter: (a, b) => a.rating - b.rating,
        align:'center',
        filters: columnFilter("rating"),
        filteredValue: filteredInfo.rating || null,
        onFilter: (value, record) => record.rating === value,
        responsive: ['sm']
    },
    {
        title: t('Tags'),
        dataIndex: 'Tags',
        key: 'Tags',
        filters: [... new Set([...reviewState?.flatMap(review => review.Tags.map(({ tag }) => tag)) ?? []])].map(value => {return{text:t(value), value}}),
        filteredValue: filteredInfo.Tags || null,
        onFilter: (value, record) => record.Tags.some((obj: {tag: string}) => obj.tag === value),
        render: (tags: {tag: string}[]) => (
            <>
            {tags?.map(({tag}) => (
                <Tag color="blue" key={tag}>
                    {tag}
                </Tag>
            ))}
            </>
        ),
    },
    {
        title: t("Created At"),
        dataIndex: "createdAt",
        key: "createdAt",
        sorter: (a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)),
        render: (date) => dayjs(date).format('DD/MM/YYYY hh:mm'),
        align:'center',
        responsive: ['lg']
    },
    {
        title: t("Updated At"),
        dataIndex: "updateAt",
        key: "updateAt",
        sorter: (a, b) => dayjs(a.updatedAt).diff(dayjs(b.updatedAt)),
        render: (date) => dayjs(date).format('DD/MM/YYYY hh:mm'),
        align:'center',
        responsive: ['lg']
    },
    {
        title: t('Action'),
        key: 'action',
        align:'center',
        render: (record) => (
            <Space size="middle">
                <a onClick={() => onOpen(record.id)}>
                    {t("Open")}
                </a>
                <Dropdown menu={{items: additionActions({record, t, setReviewEditState, deleteReview})}} trigger={['click']} >
                    <a onClick={e => e.preventDefault()}>
                        <Space>
                            {t('More actions')}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </Space>
        ),
    },
];
return columns
}
