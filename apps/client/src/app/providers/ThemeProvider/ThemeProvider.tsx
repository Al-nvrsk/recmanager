import { getSetTheme, getTheme } from "@/features/ThemeSwitcher"
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localStorege"
import { ConfigProvider, theme } from "antd"
import React, { useEffect } from "react"
import { Theme } from 'common-files'

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
                algorithm: userTheme === Theme.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm ,
            }}
        >
            {children}
        </ConfigProvider>
    );
}
