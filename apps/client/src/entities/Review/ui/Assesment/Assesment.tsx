import { StarFilled } from "@ant-design/icons"
import { Space, Typography } from "antd"
import React from "react"
import { useTranslation } from "react-i18next"

const {Text} = Typography

interface AssessmentProps {
    rate: number
    isUsers?: boolean
}

export const Assessment = (props: AssessmentProps ) => {
    const {
        rate,
        isUsers=false
    } = props
    const {t} = useTranslation()

    return (
        <Text>
            <Space >
                {isUsers
                    ? t("Users's assessment:")
                    : t("Author's assessment:")
                }                    
                <StarFilled style={{color: '#FFCC00', fontSize: '16px'}} />
                {`${rate}/${isUsers ? 5 : 10}`}
            </Space>
        </Text>
    )
}
