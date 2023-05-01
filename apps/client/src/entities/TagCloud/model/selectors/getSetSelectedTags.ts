import { useTagCloudStore } from "../store/tagCloudStore";

export const getSetSelectedTags =() => useTagCloudStore(state => state.setSelectedTags)
