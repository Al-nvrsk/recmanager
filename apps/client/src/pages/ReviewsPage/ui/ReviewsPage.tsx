import { Review, getReviewsState, getSetReviewEditState, getSetReviewsState } from '@/entities/Review';
import { getRouteReviewCreate, getRouteReviewEdit } from '@/shared/const/router';
import { Button, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from 'react-router-dom';
import cls from './ReviewsPage.module.scss'
import * as dayjs from 'dayjs'
import { trpc } from '@/shared/hooks/trpc';

const ReviewsPage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const setReviewEditState = getSetReviewEditState()
    const deleteReview = trpc.deleteReview.useMutation()
    const getReviews = trpc.getReviews.useQuery()
    const setReviews = getSetReviewsState()

    const onCreate = () => {
        navigate(getRouteReviewCreate())
        setReviewEditState()
    }

    const onEdit = (record: Review) => {
        const { Tags, createdAt, updateAt, authorId, ...currentReview} = record
        setReviewEditState({
            Tags: record.Tags.map(value => value.tag),
            ...currentReview
        })
    }

    const onDelete = (id: string) => {
        deleteReview.mutate({id})
    }

    if(deleteReview.isSuccess) {
        getReviews.refetch()    
    }

    if (getReviews.isFetched) {
        setReviews(getReviews.data)
    }

    const { Column } = Table;

    return (
        <div>
            <Button
                className={cls.createBtn}
                type={'primary'}
                htmlType={'button'}
                onClick={onCreate}
            >
                {t('Create new Review')}
            </Button>

            <Table dataSource={getReviewsState()}>
                <Column title={t("Review Name")} dataIndex="ReviewName" key="ReviewName" />
                <Column title={t("Title of work")} dataIndex="TitleOfWork" key="TitleOfWork" />
                <Column title={t("Type of work")} dataIndex="TypeOfWork" key="TypeOfWork" />
                <Column title={t("My assessment")} dataIndex="AuthRating" key="AuthRating" />
                <Column title={t("Users assessment")} dataIndex="rating" key="rating" />
                <Column
                    title={t("Tags")}
                    dataIndex="Tags"
                    key="Tags"
                    render={(tags: {tag: string}[]) => (
                        <>
                        {tags?.map(({tag}) => (
                            <Tag color="blue" key={tag}>
                                {tag}
                            </Tag>
                        ))}
                        </>
                    )}
                />
                <Column title={t("Created At")} dataIndex="createdAt" key="createdAt" render={date => {return dayjs(date).format('DD/MM/YYYY hh:mm');}} />
                <Column title={t("Updated At")} dataIndex="updateAt" key="updateAt" render={date => {return dayjs(date).format('DD/MM/YYYY hh:mm');}}/>
                <Column
                    title={t("Action")}
                    key="action"
                    render={(_: any, record: Review) => (
                        <Space size="middle">
                            <Link
                                key={record.id} 
                                onClick={()=>onEdit(record)}
                                to={getRouteReviewEdit(record.id)}
                            >
                                {t("Edit")}
                            </Link>
                            <a 
                                onClick={()=>onDelete(record.id)}
                            >
                                {t("Delete")}
                            </a>
                        </Space>
                    )}
                />
            </Table>
        </div> 
    );
}

export default ReviewsPage
