import { getSetCurrentUser } from "@/entities/User"
import { trpc } from "@/shared/hooks/trpc"
import React, { useEffect } from "react"
import { memo } from "react"
import { getSetLang } from "@/features/LangSwitcher";
import { getSetTheme } from "@/features/ThemeSwitcher";
import { Language, Theme } from "common-types";
import { showNetworkError } from "@/shared/components/showNetworkError/showNetworlError";

const MainPage = memo(() => {
    const getUser = trpc.getUser.useQuery()
    const setCurrentUser = getSetCurrentUser()
    const setLang = getSetLang()
    const setTheme = getSetTheme()
    
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
        </div>
    )
})

export default MainPage
