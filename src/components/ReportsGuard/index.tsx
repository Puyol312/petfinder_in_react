import React, { JSX, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ReportsGuard = ({ children }: { children: JSX.Element }) => {
  const [sp] = useSearchParams();

  const hasLocation = sp.get("lat") && sp.get("lng");

  useEffect(() => {
    if (!hasLocation) {
      Swal.fire({
        icon: "error",
        title: "¡Se requiere ubicación!",
        text: "Para continuar se requiere su ubicación.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }, [hasLocation]);

  if (!hasLocation) {
    return <Navigate to="/" replace />;
  }

  return children;
};
