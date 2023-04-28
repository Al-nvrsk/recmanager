import { Review, getSetReviewEditState } from "@/entities/Review"
import { EditReview } from "@/entities/Review/model/types/EditReview"
import { getRouteReviewEdit } from "@/shared/const/router"
import { TFunction } from "i18next"
import React from "react"
import { useTranslation } from "react-i18next"
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
        const { Tags, createdAt, updateAt, ...currentReview} = record
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
                    {t("Edit")}
                </Link>
            ),
        },
        { 
            key: '2', 
            label: (
                <a 
                    onClick={()=>onDelete(record.id)}
                >
                    {t("Delete")}
                </a> 
            )
        },
    ]
}
