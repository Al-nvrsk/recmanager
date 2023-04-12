import React from "react";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import cls from './Header.module.scss'
import {ReactComponent as Img}  from '@/shared/assets/logo.svg'
import { Avatar, Select } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";

export const Header = memo(() => {

    return (
        <div className={cls.Header}>
            <Img className={cls.image} />
            <ThemeSwitcher />
            <LangSwitcher />
            <Avatar size={48} icon={<UserOutlined />} />
        </div>
    );
});
