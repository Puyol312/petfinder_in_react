import React from 'react';
import * as css from "./pluss.module.css";

const plusButtonClases = `btn btn-primary btn-lg rounded-circle shadow-lg position-fixed ${css.plusbutton}`;

export function PlussButton({ onClick }: { onClick: () => void }) {
  
  return (
    <button className={plusButtonClases} onClick={onClick}>
      <i className="bi bi-plus-lg"></i>
    </button>
  );
}