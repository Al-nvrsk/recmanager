import React from 'react';
import cls from './Loader.module.scss';
import { Spin } from 'antd';

export const Loader = () => (
    <div className={cls.loader}>
        <Spin size="large" />
    </div>
);
