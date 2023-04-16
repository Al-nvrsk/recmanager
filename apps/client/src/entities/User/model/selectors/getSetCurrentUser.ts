import { useUserStore } from "../store/userStore";

export const getSetCurrentUser =() => useUserStore(state => state.setUserState)
