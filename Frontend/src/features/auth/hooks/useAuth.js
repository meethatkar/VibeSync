import React, { useContext } from "react";
import { AuthContext } from "../auth.context";
import {
  apiGetMe,
  apiLogin,
  apiLogout,
  apiRegister,
} from "../service/auth.api";
import { useEffect } from "react";

export const useAuth = () => {
  const { user, setUser, loading, setLoading, error, setError } =
    useContext(AuthContext);

  const RegisterUser = async (email, username, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiRegister(email, username, password);
      setUser(response);
      console.log(("RESPONSE USER DATA: ", response));
    } catch (error) {
      setError(error);
      console.log("REGISTER ERROR IN API CALL: ", error);
    } finally {
      setLoading(false);
    }
  };

  const LoginUser = async (userInfo, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiLogin(userInfo, password);
      setUser(response);
      console.log(("RESPONSE USER DATA: ", response));
    } catch (error) {
      setError(error);
      console.log("LOGIN ERROR IN API CALL: ", error);
    } finally {
      setLoading(false);
    }
  };

  const GetUser = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiGetMe();
      setUser(response.user);
    } catch (error) {
      setError(error);
      console.log("Fetching User ERROR IN API CALL: ", error);
    } finally {
      setLoading(false);
    }
  };

  const Logout = async () => {
    setError(null);
    setLoading(true);
    try {
      await apiLogout();
    } catch (error) {
      setError(error);
      console.log("LOGOUT ERROR IN API CALL: ", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * In-memory React state (user) gets reset to null.
The useEffect calls GetUser() to reach out to the backend (via cookies/token) and check: "Is this user already logged in?"
If yes, it restores the user data into state so the user stays logged in without having to enter their password again.
   */
  useEffect(() => {
    GetUser();
    console.log("USER X: ", user);
  }, []);
  return { user, error, RegisterUser, LoginUser, GetUser, Logout, loading };
};
