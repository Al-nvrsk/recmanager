import { useTranslation } from "react-i18next"

export const tabLocales = () => {
    const {t} = useTranslation()
    
    return {
        filterTitle: t('Filter menu'),
        filterConfirm: t('OK'),
        filterReset: t('Reset'),
        filterEmptyText: t('No filters'),
        filterCheckall: t('Select all items'),
        filterSearchPlaceholder: t('Search in filters'),
        emptyText: t('No data'),
        selectAll: t('Select current page'),
        selectInvert: t('Invert current page'),
        selectNone: t('Clear all data'),
        selectionAll: t('Select all data'),
        sortTitle: t('Sort'),
        expand: t('Expand row'),
        collapse: t('Collapse row'),
        triggerDesc: t('Click to sort descending'),
        triggerAsc: t('Click to sort ascending'),
        cancelSort: t('Click to cancel sorting'),
    }
}
