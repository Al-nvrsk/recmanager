import { getSetSearchWorkType } from "@/features/SearchFilter"
import { WorkType } from "@/shared/types/workType"
import { Select } from "antd"
import { DefaultTFuncReturn } from "i18next"
import React from "react"

interface SelectWithFilterProps {
    placeholder?: DefaultTFuncReturn
    options: WorkType[]
    styleProps?: Record<string,string>
    onChange: (workType: string) => void
    value: string
}

export const SelectWithFilter = (props: SelectWithFilterProps) => {
    const { placeholder, options, styleProps, onChange, value } = props

    return (
        <Select
            value = {value}
            allowClear ={true}
            showSearch
            onChange={onChange}
            style={styleProps}
            placeholder={placeholder}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={options}
        />
    )
}
