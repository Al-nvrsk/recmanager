import { Rate } from "antd";
import React, { memo, useCallback } from "react";
import { desc } from "../model/consts/desc";

interface RatingProps {
    isUsers?: boolean
    ratingNumber?: number
    setRatingNumber?: (value?: number) => void 

}

export const Rating = memo((props: RatingProps & Record<string, any>) => {
    const {
        isUsers = false,
        ratingNumber,
        setRatingNumber,
        ...field
    } = props

    const onHandlerChange = useCallback((rate: number) => {
        setRatingNumber!(rate || 0)
    }, [setRatingNumber])

    return (
        <Rate
            {...(!isUsers 
                ? field
                :{
                    onChange:onHandlerChange,
                    value:ratingNumber
                }
                )
            }
            tooltips={desc(isUsers)}
            allowClear={false}  
            count={isUsers? 5 : 10}
            allowHalf={true}
            />
    )
})
