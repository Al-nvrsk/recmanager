import { getCurrentUser } from "@/entities/User";
import { trpc } from "@/shared/hooks/trpc";
import { ConfigProvider, Switch } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getSetTheme } from "../model/selectors/getSetTheme";
import { getTheme } from "../model/selectors/getTheme";
import { useThemeStore } from "../model/store/themeStore";
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localStorege";
import { Theme } from "../model/types/theme";

export const ThemeSwitcher = () => {
    const {t} = useTranslation()
    const setServerTheme = trpc.setTheme.useMutation()
    const setTheme = getSetTheme()
    const userTheme =  getTheme()
    console.log('userTheme', userTheme)
    const user = getCurrentUser()

    const handleThemeSwitchClick = async (checked: boolean) => {
        const newTheme = checked ? 'dark' : 'light'
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
        setTheme(newTheme)
        
        if (user?.id) {

            await setServerTheme.mutate({ id:user.id, theme: userTheme});
                // TODO: Error theme save
        }
    };
    
    

    return (
        <Switch
            checkedChildren={t("Dark Mode")}
            unCheckedChildren={t("Light Mode")}
            checked={userTheme === 'dark'}
            onClick={handleThemeSwitchClick}
        />
    ) 
}
