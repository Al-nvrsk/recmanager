import { useTranslation } from "react-i18next"

export const workType = () => {
    const {t} = useTranslation()
    const typeName = ['Audio', 'Cinema', 'Cartoon', 'Series',  'Book', 'Comics', 'Articles']
    const SelectorType = typeName.map(val => {
        return {
            value: t(val),
            label: t(val)
        }
    }
    )
    return SelectorType
} 
