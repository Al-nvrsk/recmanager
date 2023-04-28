import { useTableSearchStore } from "../Store/TableSearchStore";

export const getSetTableSearchState =() => useTableSearchStore(state => state.setTableSearchState)
