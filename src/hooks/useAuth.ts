import { useCallback, useEffect, useContext } from "react";
import { ACCESS_TOKEN_LOCAL_STORAGE } from "../constants/common";
import { getApi } from "../services/axios.service";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  // Simulate a login action
  const login = (data: any) => {
    // Perform login logic, set user data
    const { authToken = "", ...rest } = data;
    setUser({ ...rest });
    console.log("Logged in ::::", data);
    if (authToken) {
      setIsAuthenticated(true);
      localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE, data.authToken);
    }
  };

  // Simulate a logout action
  const logout = () => {
    // Perform logout logic, clear user data
    setUser(null);
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE);
    setIsAuthenticated(false);
  };

  const updateUserInfo = useCallback(async () => {
    const result = await getApi("/users/me");
    setIsAuthenticated(true);
    setUser(result.data);
  }, [setIsAuthenticated, setUser]);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE);
    if (token && !user) {
      (async () => {
        try {
          updateUserInfo();
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [user, updateUserInfo]);

  return { user, login, logout, isAuthenticated, updateUserInfo };
};

export default useAuth;
