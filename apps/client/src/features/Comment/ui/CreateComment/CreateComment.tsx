import { TextEditor } from "@/entities/Editor"
import { Button, Space } from "antd"
import React, { memo, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import cls from './CreateComment.module.scss'
import { getCurrentUser } from "@/entities/User"
import { trpc } from "@/shared/hooks/trpc/trpc"

interface CreateCommentProps {
    setClose: (value: boolean) => void
    reviewId: string
    comment?: string
    commentId?: string
}

export const CreateComment = memo((props: CreateCommentProps) => {
    const { setClose, reviewId, comment='', commentId } = props
    const {t} = useTranslation()
    const [text, setText] = useState<string>(comment)
    const user = getCurrentUser()
    const sendComment = trpc.updateComment.useMutation()

    const onClose = useCallback(() => {
        setClose(false)
    }, [])

    const onSave = useCallback(() => {
        if (!user?.id) {
            return
        }
        sendComment.mutate({
            userId:user.id,
            reviewId,
            text,
            id: commentId
        })
    }, [user?.id, reviewId, text, commentId])

    useEffect(() => {
        if (sendComment.isSuccess) {
            onClose()
        }
    }, [sendComment])

    return (
        <>
        <Space direction={'vertical'} size={'large'} style={{width: '100%'}}>
        <TextEditor placeholder={t("Input new comment")} value={text} onChange={setText}/>
        <div className={cls.btn}>
            <Space size={'large'} >
                <Button
                    onClick={onSave}
                    htmlType={'submit'}
                    type={'primary'}>
                        {t('Save')}
                </Button>
                <Button
                    htmlType={'button'}
                    type={'primary'}
                    danger
                    onClick={onClose}
                >
                    {t('Cancel')}
                </Button>
            </Space>
        </div>
        </Space>
        </>
    )
})
