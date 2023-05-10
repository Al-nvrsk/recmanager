import { useUserStore } from "../store/userStore";

export const getSetIsLoggedIn = () => useUserStore(state => state.setIsLoggedIn)
