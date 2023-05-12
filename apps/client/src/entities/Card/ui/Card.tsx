import React, { memo, useCallback } from "react";
import {Card as AntdCard, Space, Tag, Image} from 'antd'
import { StarFilled } from "@ant-design/icons";
import cls from './Card.module.scss'
import { Link, useNavigate } from "react-router-dom";
import { getRouteReviewDetails } from "@/shared/const/router";
import { Review } from "@/entities/Review";
import { noDataImg } from "@/shared/const/NoDataImg";
import { useTranslation } from "react-i18next";

const { Meta } = AntdCard;

export const Card = memo((props: Review) => {
    const { t } = useTranslation()
    const {
        ReviewText,
        ReviewName,
        TitleOfWork,
        TypeOfWork,
        Tags, 
        id,
        rating
    } = props
    
    const navigate = useNavigate()

    const onTag: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
        e.stopPropagation()
    }, [])

    const regex = /<img\s[^>]*?src="([^"]*?)"/;
    const showcase = ReviewText?.match(regex) ?? '';

    const onDetails = useCallback(() => {
        if (id) { 
            navigate(getRouteReviewDetails(id))
        }
    }, [id])

    if (!props) {
        return <div> No data</div>
    }

    return (
        <AntdCard 
            className={cls.AntdCard}
            onClick={onDetails}
            size={'default'}
            extra={<Link to={getRouteReviewDetails(id)}>{t('More')}</Link>}
            hoverable
            title={ReviewName}
            style={{ width: 240 }}
            cover={
                <Image
                    height={240}
                    preview={false}
                    src={showcase[1]}
                    fallback={noDataImg}
                    style={{objectFit: "cover"}}
                />
            }
        >
            <Space  direction={'vertical'} style={{width: '100%'}}  >
                <Meta 
                    title={TitleOfWork}  
                />
                <div className={cls.rating}>
                    <span>
                        {t(TypeOfWork)} 
                    </span>
                    <Space>
                        {`${rating}/5`} 
                        <StarFilled className={cls.ratingStar} />
                    </Space>
                </div>
                <div className={cls.tags}>
                    {Tags?.map(({tag}) => (
                    <Tag 
                        key={tag}
                        onClick={onTag}
                        className={cls.tag}
                    >
                        {tag}
                    </Tag>
                    ))}
                </div>  
            </Space>
        </AntdCard>
    )
})
