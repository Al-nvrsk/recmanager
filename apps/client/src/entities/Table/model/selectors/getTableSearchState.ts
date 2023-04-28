import { useTableSearchStore } from "../Store/TableSearchStore";

export const getTableSearchState =() => useTableSearchStore(state => state.tableSearchState)
