import React, { Suspense } from "react";

import { useMyReports } from "../../hooks/user-hooks";
import { useNavigate } from "react-router-dom";

import * as css from './misreportes.module.css'

import { PetWanted } from "../../types/pet";

import { SignInGuard } from "../../components/Guards/SignInGuard";
import { RowReportsV2 } from "../../components/rowReports";
import { Spinner } from "../../components/spiner";
import { PlussButton } from "../../components/PlussButton/index";


export function MisReportesPage() {
  const navigate = useNavigate();
  let [nearReports,] = useMyReports();
  if (!nearReports) nearReports = [];

  const handleCardClick = (card:PetWanted) => {
    navigate(`/editarreporte?card=${card.id}`)
  };
  const handlePlussButtonClick = () => {
    navigate("/reportarnuevamascota");
  };
  
  return (
    <SignInGuard>
      <>
        <div className={css.misreportes}>
          <Suspense fallback={<Spinner /> }>
            <RowReportsV2 cards={nearReports} onClick={handleCardClick} />
          </Suspense>
        </div>
        <PlussButton onClick={handlePlussButtonClick}/>
      </>
    </SignInGuard>
  );
}