import React from "react";
import { useAuth } from "../../src/features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) <h1>LOADING...</h1>


  if (!user) {
    <Navigate to="/login" />;
  }
  return <div>{children}</div>;
};

export default Protected;
