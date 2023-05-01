import { MenuItemKey } from "../consts/menuItemKey"
import { WorkType } from "@/shared/types/workType"

export interface SearchFilterSchema {
    currentMenuKey: MenuItemKey,
    setCurrentMenuKey: (key:MenuItemKey) => void
    searchText: string
    setSearchText: (inputText: string) => void
    searchWorkType?: string 
    setSearchWorkType: (selectedWorkType: string) => void
}
