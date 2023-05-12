import { Theme } from 'common-files'
import React, { memo, useCallback } from 'react'
import { trpc } from '@/shared/hooks/trpc/trpc'
import { getSelectedTags } from '../model/selectors/getSelectedTags'
import { getSetSelectedTags } from '../model/selectors/getSetSelectedTags'
import { TagCloud as LTagCloud } from 'react-tagcloud'
import { Tag } from '../model/types/tag'
import { lightCloudTheme } from '../model/theme/lightCloudTheme'
import { darkCloudTheme } from '../model/theme/darkCloudTheme'
import { TagItem } from './TagItem/TagItem'

interface TagCloud {
    theme: Theme
}

export const TagCloud = memo((props: TagCloud) => {
    const {theme} = props
    const getTags = trpc.getTags.useQuery()
    const selectedTags = getSelectedTags()
    const setSelectedTags = getSetSelectedTags()

    const customRenderer = useCallback((tag: Tag, size: string, color: string) => (
        TagItem({tag, size, color, setSelectedTags, selectedTags})
    ), [TagItem, setSelectedTags, selectedTags])
    
    return (
        <>
            <LTagCloud
                minSize={12}
                maxSize={36}
                tags={getTags?.data || []}
                className="myTagCloud"
                renderer={customRenderer}
                colorOptions={theme === Theme.LIGHT ? lightCloudTheme : darkCloudTheme}
            />
        </>
    )
})
