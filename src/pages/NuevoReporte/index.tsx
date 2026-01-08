import React, { useEffect } from "react";
import Swal from "sweetalert2";

import { getControladorMascotas } from "../../lib/Mascotas_Controler";

import { Geolocation } from "../../types/geo";
import { DtReporte } from "../../types/pet";
import { FormDataParsed } from "../../types/form";

import { useGeo } from "../../hooks/geo-hooks";
import { useUser } from "../../hooks/user-hooks";
import { useNavigate } from "react-router-dom";

import { SignInGuard } from "../../components/Guards/SignInGuard";
import { GeoGuard } from "../../components/Guards/GeoGuard";
import { MapForm } from "../../components/MapForm";


async function enviarReporteMascota(token: string, newReport: DtReporte) {
  try {
    const res = getControladorMascotas().altaReporteMascota(token, newReport);
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
    try {
      const res = await enviarReporteMascota(token, reporte);
      Swal.fire({
        icon: 'success',
        title: '¡Reporte enviado!',
        text: 'El reporte fue recibido correctamente',
        timer: 2000,
        showConfirmButton: false
      });
      navigate('/misreportes')
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo enviar el reporte. Intente nuevamente',
        timer: 3000,
        showConfirmButton: false
      });
    }
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