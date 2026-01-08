import React, { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../../hooks/user-hooks";
import { useGeo } from "../../hooks/geo-hooks";

import { getControladorMascotas } from "../../lib/Mascotas_Controler";

import { SignInGuard } from "../../components/Guards/SignInGuard";
import { GeoGuard } from "../../components/Guards/GeoGuard";
import { MapForm } from "../../components/MapForm";

import { FormDataParsed } from "../../components/MapForm";
import { QueryGuard } from "../../components/Guards/QueryGuard";
import Swal from "sweetalert2";

function useInyection(card:string| null) {
  const [user,] = useUser();
  const [inyec, setInyec] = useState<FormDataParsed | null>(null)
  useEffect(() => {
    if (!card || !user?.token) return;
    const idCard = Number(card);
    const fetchInyec = async () => {
      try {
        const data = await getControladorMascotas().getMiReporteById(user.token, idCard);
        setInyec({
          ubicacion: data.location,
          nombre: data.name,
          ciudad: data.city,
          pais: data.country,
          imagen: data.img,
          token: user.token,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchInyec();
  }, [card, user?.token]);
  return [inyec, setInyec] as const
}
//Falta el guard de card
export function EditarReportePage() {
  const [searchParams] = useSearchParams();
  const card = searchParams.get("card");
  const navigate = useNavigate();
  const [inyec,] = useInyection(card);
  const [user,] = useUser();
  const [geo,] = useGeo();

  const handleReset = () => { 
    navigate("/misreportes")
  }
  const handleSubmit = async (data: FormDataParsed) => {
    if (!card) throw new Error("ID card faltante");
    try {
      const res = await getControladorMascotas().editarReporteMascota(
        data.token,
        Number(card),
        {
          location: data.ubicacion,
          name: data.nombre,
          city: data.ciudad,
          country: data.pais,
          img: data.imagen,
        }
      );
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
  }
  return (
    <QueryGuard q="card">
      <SignInGuard>
        <GeoGuard>
          <div>
            <MapForm onReset={handleReset} onSubmit={handleSubmit} ubicacion={geo!} token={user?.token!} inyec={inyec || undefined}/>
          </div>
        </GeoGuard>
      </SignInGuard>
    </QueryGuard>
  );
}