import { Review, getReviewsState, getSetReviewEditState, getSetReviewsState } from '@/entities/Review';
import { getRouteReviewCreate, getRouteReviewEdit } from '@/shared/const/router';
import { Button, Dropdown, Space, Table, Tag } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import {  useNavigate } from 'react-router-dom';
import cls from './ReviewsPage.module.scss'
import { trpc } from '@/shared/hooks/trpc';
import { TableProps } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { getSetTableSearchState, tabLocales } from '@/entities/Table';
import { Columns } from './Columns/Columns';

const ReviewsPage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const setReviewEditState = getSetReviewEditState()
    const deleteReview = trpc.deleteReview.useMutation()
    const getReviews = trpc.getReviews.useQuery()
    const setReviews = getSetReviewsState()
    const setTableSearch = getSetTableSearchState()
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({})

    const onCreate = () => {
        navigate(getRouteReviewCreate())
        setReviewEditState()
    }

    if(deleteReview.isSuccess) {
        getReviews.refetch()    
    }

    if (getReviews.isFetched) {
        setReviews(getReviews.data)
    }

    const onCleareFilter = () => {
        setFilteredInfo({});
        setTableSearch('')
    }
    const onHandleChange: TableProps<Review>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    }

    return (
        <div>
            <Space align={'center'} size={'large'}>
                <Button
                    className={cls.createBtn}
                    type={'primary'}
                    htmlType={'button'}
                    onClick={onCreate}
                >
                    {t('Create new Review')}
                </Button>
            
                <Button 
                    className={cls.createBtn}
                    htmlType={'button'}
                    type={'default'}
                    onClick={onCleareFilter}
                >
                    {t('Cleare filter')}
                </Button>
            </Space>
            
            <Table
                rowKey="uid"
                pagination={false}
                columns={Columns({filteredInfo, deleteReview})}
                dataSource={getReviewsState().map(review => {
                    const key = review.id
                    return {key, ... review}
                })}
                locale={tabLocales()}
                onChange={onHandleChange}
            />
        </div> 
    );
}

export default ReviewsPage



