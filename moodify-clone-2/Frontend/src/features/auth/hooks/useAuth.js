import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { loginUser, registerUser } from "../services/auth.service";
import { showSuccessToast, showErrorToast } from "../../../utils/toast";

export const useAuth = () => {
  const { user, setuser, loading, seterror, setloading, error } =
    useContext(AuthContext);

  const Register = async (username, email, password) => {
    setloading(true);
    seterror(null);
    try {
      const response = await registerUser(username, email, password);
      setuser(response.data.user);
      showSuccessToast("Registration successful!");
      console.log("RES REGI: ", response);
    } catch (error) {
      seterror(error);
      showErrorToast(error?.response?.data?.message || "Registration failed");
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
      setuser(response.data.user);
      showSuccessToast("Login successful!");
      console.log("RES LOGIN: ", response);
    } catch (error) {
      seterror(error);
      showErrorToast(error?.response?.data?.message || "Login failed");
      console.log("Error in useAuth's Login: ", error);
    } finally {
      setloading(false);
    }
  };

  return { user, loading, error, Register, Login };
};
