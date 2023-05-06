import { getCurrentUser } from "@/entities/User";
import { trpc } from "@/shared/hooks/trpc/trpc";
import { Switch } from "antd";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getSetTheme } from "../model/selectors/getSetTheme";
import { getTheme } from "../model/selectors/getTheme";
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localStorege";
import { Theme } from 'common-files'

export const ThemeSwitcher = () => {
    const {t} = useTranslation()
    const setServerTheme = trpc.setTheme.useMutation()
    const setTheme = getSetTheme()
    const userTheme =  getTheme()
    const user = getCurrentUser()

    const handleThemeSwitchClick = (checked: boolean) => {
        const newTheme = checked ? Theme.DARK : Theme.LIGHT
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
        setTheme(newTheme)
        
        if (user?.id) {
            setServerTheme.mutateAsync({ id:user.id, theme: newTheme});
                // TODO: Error theme save
        }
    };
    

    return (
        <Switch
            checkedChildren={t("Dark Mode")}
            unCheckedChildren={t("Light Mode")}
            checked={userTheme === Theme.DARK}
            onClick={handleThemeSwitchClick}
        />
    ) 
}
