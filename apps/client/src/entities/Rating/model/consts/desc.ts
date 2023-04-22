import { useTranslation } from "react-i18next";

export const desc = () => {
const {t} = useTranslation()
const rates = ['Absent','Terrible', 'Poor', 'Bad', 'Mediocre', 'Average', 'Decent', 'Good', 'Great', 'Excellent', 'Perfect'];
    return rates.map(rate => t(rate))
}
