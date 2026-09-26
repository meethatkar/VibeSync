import { createContext, useState, useEffect } from "react";
import api from "../../utils/apiClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/get-me");
        setuser(response.data.user);
      } catch (err) {
        setuser(null);
      } finally {
        setloading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setuser, loading, seterror, setloading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
