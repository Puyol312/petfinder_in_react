import React, { JSX, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

export function QueryGuard({ q, children }: { q: string, children: JSX.Element }) { 
  const [sp] = useSearchParams()
  const hasQuery = sp.get(q);
  useEffect(() => {
    if (!hasQuery) {
      Swal.fire({
        icon: 'error',
        title: `¡Se requiere ubicación!`,
        text: `Para continuar se requiere acceso a su ubicación`,
        timer: 2000,
        showConfirmButton: false
      });
    }
  }, [hasQuery]);

  if (!hasQuery) {
    return <Navigate to="/" replace />;
  }

  return children;
} 