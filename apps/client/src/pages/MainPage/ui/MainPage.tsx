import { getSetCurrentUser } from "@/entities/User"
import { trpc } from "@/shared/hooks/trpc"
import React, { useEffect } from "react"
import { memo } from "react"
import { getSetLang } from "@/features/LangSwitcher";
import { getSetTheme } from "@/features/ThemeSwitcher";
import { Language, Theme } from "common-types";
import { showNetworkError } from "@/shared/components/showNetworkError/showNetworlError";
import { Card } from "@/entities/Card";

const MainPage = () => {
    const getReviews = trpc.getReviews.useQuery()
    const getUser = trpc.getUser.useQuery()
    const setCurrentUser = getSetCurrentUser()
    const setLang = getSetLang()
    const setTheme = getSetTheme()
    
    useEffect(() => {
        console.log(getReviews.data)
    }, [getReviews])

    useEffect(() => {
        if (getUser?.data) {
        const {theme, lang, ...user} = getUser.data
        setCurrentUser(user)
        setLang(lang?.lang as Language )
        setTheme(theme?.theme as Theme)
        }
    },[getUser?.isSuccess])

    return (
        <div>
            main Page
            <button
                onClick={() => showNetworkError()}    
            >
                error
            </button>
            <Card />
        </div>
    )
}

export default MainPage
