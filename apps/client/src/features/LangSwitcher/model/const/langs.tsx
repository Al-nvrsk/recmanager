import eng from '@/shared/assets/ENG.png'
import ge from '@/shared/assets/GE.jpg'
import rus from '@/shared/assets/rus.jpg'
import { Avatar } from "antd";
import React from 'react';
import { LangSwitherTypes } from '../types/LangSwitcherTypes';
import { Language } from 'common-files';

export const langs: LangSwitherTypes[] = [
    { value: Language.ENG, label: <Avatar src={eng} />, item: eng },
    { value: Language.GEO, label:<Avatar src={ge} />, item: ge },
    { value: Language.RUS, label:<Avatar src={rus} />, item: rus },
  ]
