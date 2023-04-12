import eng from '@/shared/assets/ENG.png'
import ge from '@/shared/assets/GE.jpg'
import rus from '@/shared/assets/rus.jpg'
import { Avatar } from "antd";
import React from 'react';
import { LangSwitherTypes } from '../types/LangSwitcherTypes';

export const langs: LangSwitherTypes[] = [
    { value: 'Eng', label: <Avatar src={eng} />, item: eng },
    { value: 'GE', label:<Avatar src={ge} />, item: ge },
    { value: 'Rus', label:<Avatar src={rus} />, item: rus },
  ]
