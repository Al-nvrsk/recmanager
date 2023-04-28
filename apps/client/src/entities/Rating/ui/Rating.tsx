import { Rate } from "antd";
import React from "react";
import { desc } from "../model/consts/desc";

interface RatingProps {
    isUsers?: boolean
    ratingNumber?: number
    setRatingNumber?: (value?: number) => void 

}

export const Rating = (props: RatingProps & Record<string, any>) => {
    const {
        isUsers = false,
        ratingNumber,
        setRatingNumber,
        ...field
    } = props

    const onHandlerChange = (rate: number) => {
        setRatingNumber!(rate || 0)
    }

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
}
