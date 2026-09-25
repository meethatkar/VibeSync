import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { loginUser, registerUser } from "../services/auth.service";

export const useAuth = () => {
  const { user, setuser, loading, seterror, setloading, error } =
    useContext(AuthContext);

  const Register = async (username, email, password) => {
    setloading(true);
    seterror(null);
    try {
      const response = await registerUser(username, email, password);
      console.log("RES REGI: ", response);
    } catch (error) {
      seterror(error);
      console.log("Error in useAuth's REgister: ", error);
    } finally {
      setloading(false);
    }
  };

  const Login = async (userInfo, password) => {
    setloading(true);
    seterror(null);
    try {
      const response = await loginUser(userInfo, password);
      console.log("RES LOGIN: ", response);
    } catch (error) {
      seterror(error);
      console.log("Error in useAuth's REgister: ", error);
    } finally {
      setloading(false);
    }
  };

  return { user, loading, error, Register, Login };
};
