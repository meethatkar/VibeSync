import React from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-900 text-white">
        <div className="text-xl font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};

export default Protected;
