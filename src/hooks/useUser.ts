import { useState } from "react";
import { AclUserProps } from "../interfaces";
import useUserStore from "../store/user.store";
import { AUTH_COOKIES, getCookie, removeCookie } from "../utils/cookie";
import { getUser } from "../api/User.api";
import { useAuthStore } from "../store/auth.store";
import { UserProfileProps } from "../interfaces/user";
import { IApiException } from "../api/Api.exception";

const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [useData, setUserData] = useState<UserProfileProps | null>(null);
  const [error, setError] = useState<IApiException | null>(null);
  const { setUser, clearUserStore } = useUserStore();
  const { setToken } = useAuthStore();
  const token = getCookie(AUTH_COOKIES.ACCESS_TOKEN) || "";

  const logout = () => {
    removeCookie(AUTH_COOKIES.ACCESS_TOKEN);
    removeCookie(AUTH_COOKIES.REFRESH_TOKEN);
    clearUserStore?.();
    setUserData(null);
  };

  const getUserData = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      setToken(token);
      const result = (await getUser()) as AclUserProps;
      if (result?.aclUser) {
        setUser(result.aclUser);
        setUserData(result.aclUser);
      }
    } catch (e) {
      const error = e as IApiException;
      setError(error);
      if (error.statusCode === 401) {
        logout();
      }
      console.log("UserData Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { user: useData, loading, error, getUserData };
};

export default useUser;
