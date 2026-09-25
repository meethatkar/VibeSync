import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  return (
    <AuthContext.Provider
      value={{ user, setuser, loading, seterror, setloading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
