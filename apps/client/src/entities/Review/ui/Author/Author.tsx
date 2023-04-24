import { LikeTwoTone } from "@ant-design/icons"
import { Avatar, Space, Typography } from "antd"
import React from "react"
import * as dayjs from 'dayjs'
import { getCurrentUser } from "@/entities/User"
import cls from './Author.module.scss'

const {Text} = Typography

interface AuthorProps {
    avatar?: string
    authorName?: string
    likesNumber?: string
    dateCreate?: string
}

export const Author = (props:AuthorProps ) => {
    const currentUser = getCurrentUser()
    const {
        avatar = currentUser?.avatar,
        authorName = currentUser?.login,
        likesNumber = 0,
        dateCreate = new Date()
    } = props

    return (
        <Space className={cls.Author}>
            <Avatar src={avatar} />
            <Text>
                {authorName}
            </Text>
            <LikeTwoTone />
            <Text>
                {likesNumber}
            </Text>
            <Text>
                {dayjs(dateCreate).format('DD/MM/YYYY')}
            </Text>
        </Space>
    )
}
