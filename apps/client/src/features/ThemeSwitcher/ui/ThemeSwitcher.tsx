import { ConfigProvider, Switch } from "antd";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ThemeSwitcher = () => {
    const {t} = useTranslation()
    const [userTheme, setUserTheme] = useState('dark') // TODO: change to global state

    const handleThemeSwitchClick = (checked: boolean) => {
        const newTheme = checked ? 'dark' : 'light';
        setUserTheme(newTheme)
        console.log('newTheme', newTheme)
        // if (userId) {
        //   updateUserTheme({ userId, theme: newTheme });
        // }
        // dispatch(userActions.setUserTheme(newTheme));
    };

    return (
        <Switch
            checkedChildren={t("Dark Mode")}
            unCheckedChildren={t("Dark Mode")}
            checked={userTheme === 'dark'}
            onClick={handleThemeSwitchClick}
        />
    ) 
}
