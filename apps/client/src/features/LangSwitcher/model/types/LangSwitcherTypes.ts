import { ReactNode } from "react";
import { Language } from 'common-files'
export interface LangSwitherTypes {
    value: Language;
    label: ReactNode;
    item: string
}
