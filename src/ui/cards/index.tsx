import React from "react";

import { PetWanted } from "../../types/pet";

import * as css from "./card.module.css";

import reportSVG from "./IconParkTwotoneReport.svg";
import editSVG from "./MdiLightPencil.svg";

type PetWantedCardProps  = {
  card:PetWanted
  onClick: (card:PetWanted) => void;
}

export const PetWantedCard = ({ card, onClick }: PetWantedCardProps) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className={`card h-100 bg-dark text-light border-secondary shadow ${css.card}`}>
        <img
          src={card.img}
          className={`card-img-top ${css.card_main_img}`}
          alt={`Foto de ${card.name}`}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{card.name}</h5>
          <p className="card-text flex-grow-1">
            {card.street}, {card.city}
          </p>
          <button
            className="btn btn-success d-flex align-items-center justify-content-center gap-2 mt-auto w-100"
            data-bs-toggle="modal"
            data-bs-target="#contactModal"
            onClick={() => onClick(card)}
          >
            <img src={reportSVG} alt="" className={css.card_button_img} />
            <span>Reportar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export const PetWantedCardV2 = ({ card, onClick }: PetWantedCardProps) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className={`card h-100 bg-dark text-light border-secondary shadow ${css.card}`}>
        <img
          src={card.img}
          className={`card-img-top ${css.card_main_img}`}
          alt={`Foto de ${card.name}`}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">Editar Reporte: {card.name}</h5>
          <p className="card-text flex-grow-1">
            {card.street}, {card.city}
          </p>
          <button
            className="btn btn-success d-flex align-items-center justify-content-center gap-2 mt-auto w-100"
            onClick={() => onClick(card)}
          >
            <img src={editSVG} alt="" className={css.card_button_img} />
            <span>Editar</span>
          </button>
        </div>
      </div>
    </div>
  );
};