import { Theme } from 'common-types'
import React, { useEffect } from 'react'
import { TagCloud as RTagCloud } from 'react-tagcloud'
import cls from './TagCloud.module.scss'
import { trpc } from '@/shared/hooks/trpc'
import { noTagData } from '../model/consts/noTagData'
import { lightTheme } from '../model/theme/lightTheme'
import { darkTheme } from '../model/theme/darkTheme'

interface TagCloud {
    theme: Theme
}

export const TagCloud = (props: TagCloud) => {
    const {theme} = props
    const getTags = trpc.getTags.useQuery()
    
    const tagData = () => {
        return getTags.data?.map(el => (
            {value: el.tag, count: Number(el._count.tag) , props: {className: cls.tag} }
        ))
    }
    
    return (
        <>
        {tagData() &&
            <RTagCloud
                className={cls.TagCloud}
                minSize={12}
                maxSize={35}
                colorOptions={theme === Theme.LIGHT ? lightTheme : darkTheme}
                tags={tagData() || noTagData}
                // randomSeed={42}
                onClick={(tag: {value: string}) => alert(`'${tag.value}' was selected!`)}
            />
        }
        </>
    )
}
