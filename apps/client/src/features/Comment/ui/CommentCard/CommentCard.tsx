import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Typography } from "antd";
import React, { useState } from "react";
import type { Comment } from '../../model/types/comment'
import 'react-quill/dist/quill.snow.css';
import './CommentCard.scss'
import { CreateComment } from "../CreateComment/CreateComment";
import { getCurrentUser } from "@/entities/User";
import { trpc } from "@/shared/hooks/trpc/trpc";
import { showNetworkError } from "@/shared/components/showNetworkError/showNetworlError";
import { Author } from "@/entities/Author";
import { Loader } from "@/shared/ui/Loader/Loader";
import ReactQuill from "@/entities/Editor";

const {Text} = Typography

export const CommentCard = (comment: Comment) => {
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const currentUser = getCurrentUser()
    const deleteComment = trpc.deleteComment.useMutation()

    const onEdit = () => {
        setIsEditing(prev => !prev)
    }

    const onDelete = () => {
        deleteComment.mutate({id:comment.args.id})
        setIsDeleting(true)
    }

    if(deleteComment.isError) {
        setIsDeleting(false)
        showNetworkError()
    }

  return (
    <>
      <Card
        className={`comment`}
        size="small"
        title={
            <Author 
                avatar={comment.user.avatar}
                likedNumber={comment.user.userLikes}
                login={comment.user.login}
                dateCreate={comment.args.createdAt}
                dateUpdate={comment.args.updatedAt}
            />
        }
        headStyle={{ padding: '15px ' }}
        actions={
            (currentUser?.id === comment.user.id)
                ? [
                    <></>,
                    <></>,
                    <EditOutlined key="edit" onClick={onEdit} />,
                    <DeleteOutlined key="delete" onClick={onDelete}  />,
                    ]
                : []
            }
        >
        {isDeleting
            ? <Loader />
            : (isEditing
                ? <CreateComment 
                        reviewId={'2'} 
                        setClose={setIsEditing}
                        comment={comment.args.text}
                        commentId={comment.args.id}    
                    />
                : <ReactQuill
                        theme={'bubble'}
                        value={comment.args.text}
                        readOnly={true}
                    />
            )
        }    
        </Card>
    </>
    );
}
