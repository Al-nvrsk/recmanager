import { useTagCloudStore } from "../store/tagCloudStore";

export const getSelectedTags =() => useTagCloudStore(state => state.selectedTags) || []
