import React, { useEffect } from "react";
import Swal from "sweetalert2";

import { controladorMascotasOk as controladorMascotas } from "../../lib/api/mascotas-controller";

import { Geolocation } from "../../types/geo";
import { DtReporte } from "../../types/pet";
import { FormDataParsed } from "../../types/form";

import { useGeo } from "../../hooks/geo-hooks";
import { useUser } from "../../hooks/user-hooks";
import { useNavigate } from "react-router-dom";

import { SignInGuard } from "../../components/SignInGuard";
import { GeoGuard } from "../../components/GeoGuard";
import { MapForm } from "../../components/MapForm";

async function enviarReporteMascota(token: string, newReport: DtReporte) {
  try {
    const res = controladorMascotas.altaReporteMascota(token, newReport);
    const { message } = await res;
    Swal.fire({
      icon: 'success',
      title: '¡Reporte enviado!',
      text: `${message}`,
      timer: 2000,
      showConfirmButton: false
    });
  } catch (error) {
    console.error(`Error en handleSubmit of NuevoReportePage:\n ${error}`);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se pudo enviar el reporte. Intente nuevamente',
      timer: 3000,
      showConfirmButton: false
    });
  }
}

export function NuevoReportePage() {
  const [user,] = useUser();
  const [geo] = useGeo();
  const navigate = useNavigate()
  
  let token: string = user?.token!;
  let ubicacion: Geolocation = geo!
  const handleReset = () => {
    navigate("/misreportes")
  };
  const handleSubmit = async (data: FormDataParsed) => {
    const token = data.token;
    const reporte = {
      location: data.ubicacion,
      name: data.nombre,
      city: data.ciudad,
      country: data.pais,
      img: data.imagen
    };
    await enviarReporteMascota(token, reporte);
  };
  return (
    <SignInGuard>
      <GeoGuard>
        <div>
          <MapForm onReset={handleReset} onSubmit={handleSubmit} token={token} ubicacion={ubicacion}></MapForm>
        </div>
      </GeoGuard>
    </SignInGuard>
  );
}