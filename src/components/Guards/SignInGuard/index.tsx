import React ,{ JSX, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/user-hooks";
import Swal from "sweetalert2";

export function SignInGuard({ children }: { children: JSX.Element }) {
  const [user,] = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && location.pathname !== '/help') {
      Swal.fire({
        icon: 'error',
        title: `¡Se requiere usuario!`,
        text: `Para continuar se requiere una sesión activa`,
        timer: 2000,
        showConfirmButton: false
      });
      navigate('/help', { replace: true });
    }
  }, [user, location.pathname, navigate]);

  return children;
}