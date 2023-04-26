import { Rate } from "antd";
import React from "react";
import { desc } from "../model/consts/desc";

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
