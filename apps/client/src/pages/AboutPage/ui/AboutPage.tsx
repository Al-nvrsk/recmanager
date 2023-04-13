import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"

const AboutPage = memo(() => {
    const {t} = useTranslation()
    return (
        <div>
            {t("About")}
        </div>
    )
})

export default AboutPage
