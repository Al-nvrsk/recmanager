import { LikeTwoTone } from "@ant-design/icons"
import { Avatar, Space, Typography } from "antd"
import React from "react"
import * as dayjs from 'dayjs'
import { User, getCurrentUser } from "@/entities/User"
import cls from './Author.module.scss'

const {Text} = Typography

interface AuthorProps {
    dateCreate?: string
    avatar?: string | null
    login?: string
    likedNumber?: number
}

export const Author = (props: AuthorProps ) => {
    const { 
        avatar, login, likedNumber, dateCreate
    } = props

    return (
        <Space className={cls.Author}>
            <Avatar src={avatar} />
            <Text>
                {login}
            </Text>
            <Text>
                {likedNumber}
            </Text>
            <LikeTwoTone />
            <Text>
                {dayjs(dateCreate).format('DD/MM/YYYY')} 
            </Text>
        </Space>
    )
}
