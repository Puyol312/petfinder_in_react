import React from "react";

import * as css from "../config.module.css"

import { useNavigate } from "react-router-dom";

import { MainButton } from "../../../ui/button";

export function ConfigPrincipalPage() {
  const navigate = useNavigate();

  const handleClickPassword = () => {
    navigate('password')
  }
  const handleClickData = () => { 
    navigate('data')
  }
  return (
    <>
      <div className={css.configHeader}>
        <h1> Mis datos </h1>
      </div>
      <div className={css.configActions}>
        <MainButton type="button" onClick={handleClickData}>
          Modificar datos personales
        </MainButton>
        <MainButton type="button" onClick={handleClickPassword}>
          Modificar contraseña
        </MainButton>
      </div>
    </>
  );
}