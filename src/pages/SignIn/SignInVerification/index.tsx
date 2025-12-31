import React ,{ JSX } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../hooks/user-hooks";

export function SignInVerification ({ children }: { children: JSX.Element }) {
  const [user,] = useUser();

  if (user) {
    return <Navigate to="/misreports" replace />;
  }

  return children;
}