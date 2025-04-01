import { useEffect } from "react";
import { AclUserProps } from "../interfaces";
import useUserStore from "../store/user.store";
import { AUTH_COOKIES, getCookie } from "../utils/cookie";
import { getUser } from "../api/User.api";
import { useAuthStore } from "../store/auth.store";

const useUser = () => {
  const { setUser } = useUserStore();
  const { setToken } = useAuthStore();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const token = getCookie(AUTH_COOKIES.ACCESS_TOKEN) || "";
      setToken(token);
      const { aclUser } = (await getUser(token)) as AclUserProps;
      setUser(aclUser);
    } catch (error) {
      console.log("UserData Error: ", error);
    }
  };
};

export default useUser;
