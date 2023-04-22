import { Rate } from "antd";
import React, { FC } from "react";
import { desc } from "../model/consts/desc";

export const Rating = ({...field}) => {

    return (
        <Rate 
            {...field}
            tooltips={desc()}
            allowClear={false}  
            count={10}
            allowHalf={true}
            />
    )
}
