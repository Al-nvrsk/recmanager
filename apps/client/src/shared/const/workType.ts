import { useTranslation } from "react-i18next"
import { WorkType } from "../types/workType"

export const workType = (): WorkType[] => {
    const {t} = useTranslation()
    const typeName = ['Audio', 'Cinema', 'Cartoon', 'Series',  'Book', 'Comics', 'Articles']
    const SelectorType = typeName.map(val => {
        return {
            value: val,
            label: t(val),
            text: t(val),
            key: val
        }
    }
    )
    return SelectorType
} 
