import { getRouteReviewCreate } from '@/shared/const/router';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';


const ReviewsPage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()

    const onCreate = () => {
        navigate(getRouteReviewCreate())
    }

    return (
        <div>
            Reviews Page
            <Button
            type={'primary'}
            htmlType={'button'}
            onClick={onCreate}
            >
                {t('Create new Review')}
            </Button>
        </div> 
      );
}

export default ReviewsPage
