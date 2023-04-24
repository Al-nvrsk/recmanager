import { useTranslation } from "react-i18next";

export const desc = (isUsers:boolean = false) => {
    const {t} = useTranslation()
    const ratesAuthor = ['Disgusting','Terrible', 'Poor', 'Bad', 'Mediocre', 'Average', 'Decent', 'Good', 'Great', 'Excellent', 'Perfect'];
    const rateUsers = ['Poor', 'Mediocre', 'Average', 'Good', 'Excellent']
    if (isUsers) {
        return rateUsers.map(rate => t(rate))
    }
        return ratesAuthor.map(rate => t(rate))
    }
