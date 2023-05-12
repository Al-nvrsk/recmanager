import { Space, Typography } from "antd"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"

const {Text, Title} = Typography

const AboutPage = memo(() => {
    const {t} = useTranslation()
    return (
        <div>
            <Title level={4}>
            {t("About")}
            </Title>
            <Text>
                <Space direction={'horizontal'}>
                {t("You can see the project code ")}
                <a href="https://github.com/Al-nvrsk/reviewshub" target="_blank" >
                    {t('on website')}
                </a>
                </Space>
            </Text>
                
        </div>
    )
})

export default AboutPage
