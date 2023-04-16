import { useUserStore } from "../store/userStore";

export const getIsAuth = () => useUserStore(state => Boolean(state.userState))
