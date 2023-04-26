import { getSetCurrentUser } from "@/entities/User"
import { trpc } from "@/shared/hooks/trpc"
import React, { useEffect } from "react"
import { getSetLang } from "@/features/LangSwitcher";
import { getSetTheme, getTheme } from "@/features/ThemeSwitcher";
import { Language, Theme } from "common-types";
import { showNetworkError } from "@/shared/components/showNetworkError/showNetworlError";
import { Card } from "@/entities/Card";
import { getSetReviewsState } from "@/entities/Review/model/selectors/getSetReviewsState";
import { getReviewsState } from "@/entities/Review/model/selectors/getReviewsState";

import cls from './MainPage.module.scss'
import { TagCloud } from "@/entities/TagCloud";

const MainPage = () => {
    const getReviews = trpc.getReviews.useQuery()
    const getUser = trpc.getUser.useQuery()
    const setCurrentUser = getSetCurrentUser()
    const setLang = getSetLang()
    const setTheme = getSetTheme()
    const theme = getTheme() 
    
    const setReviews = getSetReviewsState()
    const reviews = getReviewsState()
    
    useEffect(() => {
        if (getReviews.data) {
            setReviews(getReviews.data)
        }
    }, [getReviews])

    useEffect(() => {
        if (getUser?.data) {
        const {theme, lang, ...user} = getUser.data
        setCurrentUser(user)
        setLang(lang?.lang as Language )
        setTheme(theme?.theme as Theme)
        }
    },[getUser?.isSuccess])
    console.log('reviewMap', reviews)
    return (
        <div>
            <TagCloud theme={theme} />
            <button
                onClick={() => showNetworkError()}    
            >
                error
            </button>
            <div className={cls.cardList}>
                {reviews?.map(review => (
                    <Card key={review.id} {...review} />
                )) }
            </div>           
        </div>
    )
}

export default MainPage
