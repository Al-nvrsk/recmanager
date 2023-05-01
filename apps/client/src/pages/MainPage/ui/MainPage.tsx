import { trpc } from "@/shared/hooks/trpc"
import React, { useEffect, useState } from "react"
import { getTheme } from "@/features/ThemeSwitcher";
import { showNetworkError } from "@/shared/components/showNetworkError/showNetworlError";
import { Card } from "@/entities/Card";
import { getSetReviewsState } from "@/entities/Review/model/selectors/getSetReviewsState";
import { getReviewsState } from "@/entities/Review/model/selectors/getReviewsState";
import cls from './MainPage.module.scss'
import { TagCloud, getSelectedTags } from "@/entities/TagCloud";
import { useTranslation } from "react-i18next";
import { MenuItemKey, SearchFilter, getCurrentMenuKey, getSearchText, getSearchWorkType } from "@/features/SearchFilter";
import { Empty } from "antd";

const MainPage = () => {
    const [part, setPart] = useState(1)
    const {t} = useTranslation()
    const theme = getTheme() 
    const reviews = getReviewsState() 
    const setReviews = getSetReviewsState()
    const selectedTags = getSelectedTags()
    const sendSearchText = trpc.searchText.useMutation()
    const currentMenuKey = getCurrentMenuKey() 
    const searchText = getSearchText()
    const searchWorkType = getSearchWorkType()

    const getReviews = trpc.getReviews.useQuery({
        limit:10,
        part,
        search: currentMenuKey,
        workType: searchWorkType,
        tags: selectedTags
    })

    useEffect(() => {
        if (currentMenuKey===MenuItemKey.SEARCH) {
            return
        }
        getReviews.refetch()
    },[part, currentMenuKey, searchWorkType ])
    
    useEffect(() => {
        if (getReviews.data) {
            setReviews(getReviews.data)
        }
    }, [getReviews])

    useEffect(() => {
        if (searchText) {
            sendSearchText.mutate({
                text:searchText,
                workType: searchWorkType,
                tags: selectedTags
            } )
            }
    }, [searchText])

    useEffect(() => {
        setReviews(sendSearchText.data)
    }, [sendSearchText.data])

    return (
        <div className={cls.MainPage}>
            <SearchFilter />
            <TagCloud theme={theme} />
            <div className={cls.cardList}>
                {reviews?.length === 0  && <Empty description={t('No reviews')} />}
                {reviews?.map(review => (
                    <Card key={review.id} {...review} />
                )) }
            </div>           
        </div>
    )
}

export default MainPage
