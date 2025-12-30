import React from "react";

import { PetWantedCard } from "../../ui/cards";

import { PetWanted } from "../../types/pet";

type rowReportsPros = {
  cards: PetWanted[],
  onClick: (card:PetWanted) => void
}

const RowReports = ({ cards, onClick }: rowReportsPros) => {
  return (
    <div className="row justify-content-center g-4" style={{margin:10}}>
      {cards.length > 0
        ? cards.map((r) => { 
          return <PetWantedCard key={r.id} card={r} onClick={onClick} />
        })
        : <p className='text-center'>No hay mascotas perdidas cerca de usted.</p>
      }
    </div>
  );
}
export { RowReports }