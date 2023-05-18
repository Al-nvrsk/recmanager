import React, { memo, useEffect } from "react"
import { trpc } from "@/shared/hooks/trpc/trpc"
import { Space } from "antd"
import { CommentCard } from "../CommentCard/CommentCard"

interface CommentListProps {
    id: string,
    addedNewComment: boolean
}

export const CommentList = memo((props: CommentListProps) => {
    const { id, addedNewComment } = props
    const getComments = trpc.getComments.useQuery({id}, {
        refetchInterval: 4000,
        refetchIntervalInBackground: true
    })

    useEffect(() => {
        getComments.refetch()
    },[addedNewComment])

    return (
        <>
            <Space direction={'vertical'} size={'middle'} style={{width:'100%'}} >
                {getComments.data?.map(comment => (
                    <CommentCard 
                        {...comment} 
                        key={comment.id}
                    />
                ))}
            </Space>        
        </>
    )
})
