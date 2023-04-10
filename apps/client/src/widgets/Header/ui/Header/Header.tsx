import * as React from "react";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import cls from './Header.module.scss'


export const Header = memo(() => {
    const { t } = useTranslation();

    return (
        <div className={cls.Header}>
            some text
        </div>
    );
});
