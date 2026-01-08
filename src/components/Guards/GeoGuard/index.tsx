import React, { JSX, useEffect } from "react";
import Swal from "sweetalert2";

import { useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useGeo } from "../../../hooks/geo-hooks";

export const GeoGuard = ({ children }: { children: JSX.Element }) => {
  const [sp] = useSearchParams();
  const [geo,] = useGeo();

  const hasLocation = sp.get("lat") && sp.get("lng");
  useEffect(() => {
    if (!hasLocation && !geo) {
      Swal.fire({
        icon: 'error',
        title: `¡Se requiere ubicación!`,
        text: `Para continuar se requiere acceso a su ubicación`,
        timer: 2000,
        showConfirmButton: false
      });
    }
  }, [hasLocation]);

  if (!hasLocation && !geo) {
    return <Navigate to="/" replace />;
  }

  return children;
};
