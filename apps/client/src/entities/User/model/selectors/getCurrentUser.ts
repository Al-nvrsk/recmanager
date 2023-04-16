import { useUserStore } from "../store/userStore";

export const getCurrentUser =() => useUserStore(state => state.userState)
