import { useUserStore } from "../store/userStore";

export const getIsLoggedIn = () => useUserStore(state => state.isLoggedIn)
