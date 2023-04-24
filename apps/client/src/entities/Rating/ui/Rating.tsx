import { Rate } from "antd";
import React, { FC } from "react";
import { desc } from "../model/consts/desc";
import { boolean } from "zod";

interface RatingProps {
    isUsers?: boolean
}

export const Rating = (props: RatingProps & Record<string, any>) => {
    const {isUsers = false , ...field} = props

    return (
        <Rate 
            {...field}
            tooltips={desc(isUsers)}
            allowClear={false}  
            count={isUsers? 5 : 10}
            allowHalf={true}
            />
    )
}
