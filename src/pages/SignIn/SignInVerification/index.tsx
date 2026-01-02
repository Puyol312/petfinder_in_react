import React ,{ JSX, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/user-hooks";

export function SignInVerification({ children }: { children: JSX.Element }) {
  const [user] = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && location.pathname !== '/help') {
      navigate('/help', { replace: true });
    }
  }, [user, location.pathname, navigate]);

  return children;
}