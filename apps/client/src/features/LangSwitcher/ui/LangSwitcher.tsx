import { Avatar, Select } from "antd";
import { useTranslation } from "react-i18next";
import React, { ReactNode, memo } from "react";
import cls from './LangSwitcher.module.scss'
import { langs } from "../model/const/langs";
import { LangSwitherTypes } from "../model/types/LangSwitcherTypes";

const { Option } = Select;

export const LangSwitcher = memo(() => {
    const { t, i18n } = useTranslation(); 

    const toggle = (e: LangSwitherTypes) => {
        switch (e.value) {
            case 'Rus':
                i18n.changeLanguage('ru')
                break
            case 'Eng': 
                i18n.changeLanguage('en')
                break
            case 'Ge':
                i18n.changeLanguage('en')
                break
        } 
    };

    return (
        <Select
            defaultValue= {langs[0]}
            style={{ width: 120 }}
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
