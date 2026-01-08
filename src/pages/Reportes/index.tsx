import React, { Suspense, useState } from "react";
import Swal from "sweetalert2";

import { Geolocation } from "../../types/geo";
import { PetWanted } from "../../types/pet";

import { getControladorMascotas } from "../../lib/Mascotas_Controler";

import * as css from "./mascotas.module.css"

import { useNearReports } from "../../hooks/geo-hooks";

import { GeoGuard } from "../../components/Guards/GeoGuard";
import { RowReports } from "../../components/rowReports";
import { ContactModal } from "../../components/ReportModal";
import { Spinner } from "../../components/spiner";

export const ReportPage = () => {
  let [nearReports,] = useNearReports();
  if (!nearReports) nearReports = [];
  const [selectedCard, setSelectedCard] = useState<PetWanted | null>(null);

  const handleOpenModal = (card:PetWanted) => {
    setSelectedCard(card);
  };

  function handleOnContact({ id, name, message, phone }: {id:number, name:string, message:string, phone:string}) { 
    getControladorMascotas().enviarReporteMascota(name, phone, message, id)
      .then(respuesta => {
        Swal.fire({
          icon: 'success',
          title: '¡Reporte enviado!',
          text: 'El reporte fue recibido correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo enviar el reporte. Intente nuevamente',
          timer: 3000,
          showConfirmButton: false
        });
      });
  }
  return (
    <GeoGuard>
      <div className={css.mascotas}>
        <Suspense fallback={<Spinner /> }>
          <RowReports cards={nearReports} onClick={handleOpenModal} />
        </Suspense>
        <ContactModal card={selectedCard} onContact={handleOnContact} />
      </div>
    </GeoGuard>
  );
}