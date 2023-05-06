import { MenuItemKey } from "common-files"

export interface SearchFilterSchema {
    currentMenuKey: MenuItemKey,
    setCurrentMenuKey: (key:MenuItemKey) => void
    searchText: string
    setSearchText: (inputText: string) => void
    searchWorkType?: string 
    setSearchWorkType: (selectedWorkType: string) => void
    part: number
    setPart : (newNumber: number) => void
}
