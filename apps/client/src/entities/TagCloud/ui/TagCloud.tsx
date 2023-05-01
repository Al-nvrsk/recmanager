import { Theme } from 'common-types'
import React, { useEffect, useState } from 'react'
import cls from './TagCloud.module.scss'
import { trpc } from '@/shared/hooks/trpc'

import { Tag } from 'antd'
import CheckableTag from 'antd/es/tag/CheckableTag'
import { getSelectedTags } from '../model/selectors/getSelectedTags'
import { getSetSelectedTags } from '../model/selectors/getSetSelectedTags'

interface TagCloud {
    theme: Theme
}

export const TagCloud = (props: TagCloud) => {
    const {theme} = props
    const getTags = trpc.getTags.useQuery()
    const selectedTags = getSelectedTags()
    const setSelectedTags = getSetSelectedTags()

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
    };

    
    return (
        <>
            { getTags.data &&
                getTags.data.map(el =>
                    (<CheckableTag
                        // style={{height: `${50*el._count}px`}}
                        key={el.tag}
                        checked={selectedTags.indexOf(el.tag) > -1}
                        onChange={checked => handleChange(el.tag, checked)}
                    >
                        {el.tag}
                    </CheckableTag>))
            }
        </>
    )
}
