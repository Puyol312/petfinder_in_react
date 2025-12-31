import React, { JSX, useEffect } from "react";
import Swal from "sweetalert2";

import { useUser } from "../../hooks/user-hooks";
import { Navigate } from "react-router-dom";

export function SignInGuard({ children }: { children: JSX.Element }) {
  const [user,] = useUser();

  useEffect(() => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "¡Se requiere estar logeado!",
        text: "Para continuar se requiere que usted este registrado.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }, [user]);
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}