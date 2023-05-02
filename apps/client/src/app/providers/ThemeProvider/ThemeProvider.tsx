import { getCurrentUser } from "@/entities/User"
import { getSetTheme, getTheme } from "@/features/ThemeSwitcher"
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localStorege"
import { trpc } from "@/shared/hooks/trpc/trpc"
import { ConfigProvider, theme } from "antd"
import React, { useEffect } from "react"
import { Theme } from 'common-types'

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeProvider = (props: ThemeProviderProps) => {
    const {children} = props
    const userTheme = getTheme()
    const setTheme = getSetTheme()

    useEffect(() => {
        const localTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme
        if (localTheme) {
        setTheme(localTheme)
        }
    }, [])

    return (
        <ConfigProvider
            theme={{
                algorithm: userTheme === 'LIGHT' ? theme.defaultAlgorithm :theme.darkAlgorithm,
            }}
        >
            {children}
        </ConfigProvider>
    );
}
