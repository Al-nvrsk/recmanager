import { Typography } from "antd"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"

const {Text} = Typography

const AboutPage = memo(() => {
    const {t} = useTranslation()
    return (
        <div>
            <Text>
            {t("About")}
            </Text>
        </div>
    )
})

export default AboutPage
