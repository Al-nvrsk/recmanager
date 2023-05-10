import CheckableTag from "antd/es/tag/CheckableTag"
import { Tag } from "../../model/types/tag"
import React from "react"

interface TagItem {
    tag: Tag,
    size: string,
    color: string
    selectedTags: string[]
    setSelectedTags: (tags?: string[] | undefined) => void 
}

export const TagItem = ( props: TagItem) => {
    const {
        tag,
        size,
        color,
        setSelectedTags,
        selectedTags
    } = props

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags);
    };

    return (
        <CheckableTag
            key={tag.value}
            checked={selectedTags.indexOf(tag.value) > -1}
            onChange={checked => handleChange(tag.value, checked)}
            style={{
                fontSize: size,
                color: color,
                border: `1px solid ${color}`,
                margin: '3px',
                padding: '0.25em 0.5em',
                display: 'inline-block',
            }}
        >
                {tag.value}
        </CheckableTag>
    )
}
