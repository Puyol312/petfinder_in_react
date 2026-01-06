import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import { useUser } from "../../hooks/user-hooks";
import { useGeo } from "../../hooks/geo-hooks";

import { controladorMascotasOk as controladorMascotas } from "../../lib/api/mascotas-controller";

import { SignInGuard } from "../../components/SignInGuard";
import { GeoGuard } from "../../components/GeoGuard";
import { MapForm } from "../../components/MapForm";

import { FormDataParsed } from "../../components/MapForm";
import { QueryGuard } from "../../components/QueryGuard";

function useInyection() {
  const [user,] = useUser();
  const [inyec, setInyec] = useState<FormDataParsed | null>(null)
  const [searchParams] = useSearchParams();
  const card = searchParams.get("card");
  useEffect(() => {
    if (!card || !user?.token) return;
    const idCard = Number(card);
    const fetchInyec = async () => {
      try {
        const data = await controladorMascotas.getMiReporteById(user.token, idCard);
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
  const [inyec,] = useInyection();
  const [user,] = useUser();
  const [geo,] = useGeo();

  const handleReset = () => { 

  }
  const handleSubmit = () => { 

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