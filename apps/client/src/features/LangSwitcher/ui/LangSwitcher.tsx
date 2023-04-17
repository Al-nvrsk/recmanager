import { Avatar, Select } from "antd";
import { useTranslation } from "react-i18next";
import React, { ReactNode, memo, useEffect, useState } from "react";
import cls from './LangSwitcher.module.scss'
import { langs } from "../model/const/langs";
import { LangSwitherTypes } from "../model/types/LangSwitcherTypes";
import { Language } from "common-types";
import { LOCAL_STORAGE_LANG_KEY } from "@/shared/const/localStorege";
import { getSetLang } from "../model/selectors/getSetLang";
import { trpc } from "@/shared/hooks/trpc";
import { getCurrentUser } from "@/entities/User";
import { getLang } from "../model/selectors/getLang";

const { Option } = Select;

export const LangSwitcher = memo(() => {    
    const {i18n } = useTranslation();
    const setLang = getSetLang()
    const lang = getLang()
    const setServerLang = trpc.setLang.useMutation()
    const user = getCurrentUser()
    const [defaultValue, setDefaultValue] = useState(langs)

    useEffect(() => {
        const localLang = localStorage.getItem(LOCAL_STORAGE_LANG_KEY) as Language
        localLang && setLang(localLang)
    }, [])

    useEffect(() => {
       if (lang) {
            i18n.changeLanguage(lang)
            setDefaultValue(langs.filter(val => val.value === lang ))
       }
    },[lang])
    
    const toggle = (e: LangSwitherTypes) => {
            const newLang = e.value
            setLang(newLang)
            localStorage.setItem(LOCAL_STORAGE_LANG_KEY, newLang)
            if (user?.id) {
                setServerLang.mutateAsync({ id:user.id, lang: newLang});
                           // TODO: Error theme save
                }

    };

    return (
        <Select
            style={{ width: 120 }}
            value={defaultValue[0]}
            optionLabelProp="label"
            bordered={false}
            suffixIcon={false}
            placement={"bottomLeft"}
            labelInValue={true}
            onChange={(e: LangSwitherTypes) => toggle(e)}
        >
            {langs.map((item, index) => (
                <Option key={index} value={item.value} label={item.label}>
                    <div className={cls.langSwitcher}>
                        {item.label}
                        {item.value}
                    </div>
                </Option>
            ))} 
        </Select> 
    )
})
