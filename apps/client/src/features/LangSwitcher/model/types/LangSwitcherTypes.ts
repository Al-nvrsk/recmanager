import { ReactNode } from "react";
import { Language } from 'common-types'
export interface LangSwitherTypes {
    value: Language;
    label: ReactNode;
    item: string
}
