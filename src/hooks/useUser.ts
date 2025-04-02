import { useEffect, useState } from "react";
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
  const { setUser, clearUserStore } = useUserStore();
  const { setToken } = useAuthStore();
  const token = getCookie(AUTH_COOKIES.ACCESS_TOKEN) || "";

  const logout = () => {
    removeCookie(AUTH_COOKIES.ACCESS_TOKEN);
    removeCookie(AUTH_COOKIES.REFRESH_TOKEN);
    clearUserStore();
  };

  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const getUserData = async () => {
    try {
      setToken(token);
      const { aclUser } = (await getUser(token)) as AclUserProps;
      setUser(aclUser);
      setUserData(aclUser);
    } catch (e) {
      const error = e as IApiException;
      console.log("UserData Error: ", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  return { user: useData, loading };
};

export default useUser;
