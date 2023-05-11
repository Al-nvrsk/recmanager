import { Review, getSetReviewEditState } from "@/entities/Review"
import { EditReview } from "@/entities/Review/model/types/EditReview"
import { getRouteReviewEdit } from "@/shared/const/router"
import { Popconfirm } from "antd"
import { TFunction } from "i18next"
import React from "react"
import { Link } from "react-router-dom"

interface AdditionActionsProps {
    record: Review
    t: TFunction
    setReviewEditState: (reviewState?: EditReview | undefined) => void
    deleteReview: {
        mutate: ({ id }: { id: string }) => void
    }
}

export const additionActions = (props: AdditionActionsProps) => {
    const {record, t, setReviewEditState, deleteReview} = props

    const onEdit = (record: Review) => {
        const { Tags, createdAt, updatedAt, ...currentReview} = record
        setReviewEditState({
            Tags: record.Tags.map(value => value.tag),
            ...currentReview
        })
    }

    const onDelete = (id: string) => {
        deleteReview.mutate({id})
    }

    return [
        { 
            key: '1', 
            label:(
                <Link
                    onClick={()=>onEdit(record)}
                    to={getRouteReviewEdit(record.id)}
                >
                    {"Edit"}
                </Link>
            ),
        },
        { 
            key: '2', 
            label: (
                    <Popconfirm
                        title={"Are you sure?"}
                        okText={"Yes"}
                        cancelText={"No"}
                        onConfirm = {()=>onDelete(record.id)}
                    >
                        <a 
                            href="#" 
                            onClick={(e) => e.preventDefault()}
                            style={{color: 'red'}}
                        >
                            {"Delete"}
                        </a>
                    </Popconfirm>
            )
        },
    ]
}
