import { Review, getReviewsState, getSetReviewEditState, getSetReviewsState } from '@/entities/Review';
import { getRouteReviewCreate, getRouteReviewEdit } from '@/shared/const/router';
import { Button, Dropdown, Space, Table, Tag, Typography } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from "react-i18next";
import {  useLocation, useNavigate } from 'react-router-dom';
import cls from './ReviewsPage.module.scss'
import { trpc } from '@/shared/hooks/trpc/trpc';
import { TableProps } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { getSetTableSearchState, tabLocales } from '@/entities/Table';
import { Columns } from './Columns/Columns';
import { getCurrentUser } from '@/entities/User';

const {Title} = Typography

const ReviewsPage = () => {
    const location = useLocation();
    const id = location.state?.id ;
    const {t} = useTranslation()
    const navigate = useNavigate()
    const setReviewEditState = getSetReviewEditState()
    const deleteReview = trpc.deleteReview.useMutation()
    const currentUser = getCurrentUser()
    const getReviews = trpc.getAllMyReviews.useQuery({authorId:id || currentUser!.id})
    const setTableSearch = getSetTableSearchState()
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({})

    const onCreate = () => {
        navigate(getRouteReviewCreate())
        setReviewEditState()
    }

    if(deleteReview.isSuccess) {
        getReviews.refetch()    
    }

    const onCleareFilter = useCallback(() => {
        setFilteredInfo({});
        setTableSearch('')
    }, [])
    
    const onHandleChange: TableProps<Review>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    }

    return (
        <div className={cls.ReviewsPage}>
            {id && 
            <Title>
                {t('ADMIN mode')}    
            </Title>
            }
            <Space align={'center'} size={'large'}>
                {!id &&
                <Button
                    className={cls.createBtn}
                    type={'primary'}
                    htmlType={'button'}
                    onClick={onCreate}
                >
                    {t('Create new Review')}
                </Button>
                }
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
                className={cls.yourTable}
                rowKey="uid"
                pagination={false}
                columns={Columns({filteredInfo, deleteReview, reviewState: getReviews.data || []})}
                dataSource={getReviews.data?.map(review => {
                    const key = review.id
                    return {key, ... review}
                })}
                locale={tabLocales()}
                onChange={onHandleChange}
                size={'small'}
            />
        </div> 
    );
}

export default memo(ReviewsPage)



