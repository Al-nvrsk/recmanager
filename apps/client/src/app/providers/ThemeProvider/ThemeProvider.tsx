import { ConfigProvider, theme } from "antd"
import React from "react"

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeProvider = (props: ThemeProviderProps) => {
    const {children} = props
    const userTheme = 'light' // TODO : take value from global state

    return (
        <ConfigProvider
            theme={{
                algorithm: userTheme === 'light' ? theme.defaultAlgorithm :theme.darkAlgorithm,
            }}
        >
            {children}
        </ConfigProvider>
    );
}
