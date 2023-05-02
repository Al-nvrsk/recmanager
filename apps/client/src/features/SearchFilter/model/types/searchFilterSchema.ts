import { MenuItemKey } from "common-types"

export interface SearchFilterSchema {
    currentMenuKey: MenuItemKey,
    setCurrentMenuKey: (key:MenuItemKey) => void
    searchText: string
    setSearchText: (inputText: string) => void
    searchWorkType?: string 
    setSearchWorkType: (selectedWorkType: string) => void
    part: number
    setPart : (newNumber: number) => void
    currentsearchType: MenuItemKey
    setCurrentSearchType: (searchType: MenuItemKey) => void
}
