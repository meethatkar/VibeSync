import React, { useContext } from 'react'
import { AuthContext } from '../auth.context'
import { apiGetMe, apiLogin, apiLogout, apiRegister } from '../service/auth.api';

export const useAuth = () => {
  const { user, setUSer, loading, setLoading, error, setError } = useContext(AuthContext);

  const RegisterUser = async (email, username, password) => {
    setLoading(true);
    try {
      const response = await apiRegister(email, username, password);
      setUSer(response);
      console.log(("RESPONSE USER DATA: ", response));

    } catch (error) {
      setError(error);
      console.log("REGISTER ERROR IN API CALL: ", error);
    }
    finally {
      setLoading(false);
    }
  }

  const LoginUser = async (userInfo, password) => {
    setLoading(true);
    try {
      const response = await apiLogin(userInfo, password);
      setUSer(response);
      console.log(("RESPONSE USER DATA: ", response));

    } catch (error) {
      setError(error);
      console.log("LOGIN ERROR IN API CALL: ", error);
    }
    finally {
      setLoading(false);
    }
  }

  const GetUser = async () => {
    setLoading(true);
    try {
      await apiGetMe();
    } catch (error) {
      setError(error);
      console.log("Fetching User ERROR IN API CALL: ", error);
    }
    finally {
      setLoading(false);
    }
  }

  const Logout = async () => {
    setLoading(true);
    try {
      await apiLogout();
    } catch (error) {
      setError(error);
      console.log("LOGOUT ERROR IN API CALL: ", error);
    }
    finally {
      setLoading(false);
    }
  }

  return { user, error, RegisterUser, LoginUser, GetUser, Logout, loading }
}