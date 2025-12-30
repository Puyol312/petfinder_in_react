import React from "react";

import imgHelp from './img-help.jpg';
import { Link } from "react-router-dom";

function HelpImage() {
  return (
    <div className="col-md-5 d-flex justify-content-center align-items-center mb-3 mb-md-0">
      <img
        src={imgHelp}
        alt="Petfinder ayuda"
        className="img-fluid rounded shadow-sm w-100"
        style={{ maxHeight: '250px', objectFit: 'cover' }}
      />
    </div>
  );
}
function HelpText() {
  return (
    <div className="col-md-7">
      <h3 className="mb-3">
        Tu asistente para encontrar mascotas perdidas
      </h3>

      <p>
        PetFinder es una plataforma diseñada para ayudar a personas a encontrar
        y reportar mascotas perdidas o encontradas. Todo funciona de manera simple:
      </p>

      <ul>
        <li><strong>Crea un reporte</strong> con foto, ubicación y detalles de la mascota.</li>
        <li><strong>Otros usuarios pueden verla</strong> en el mapa o en la lista de reportes.</li>
        <li><strong>Pueden contactarte</strong> si la vieron o tienen información.</li>
        <li><strong>Vos recibís su mensaje</strong> directo al mail y tomás acción.</li>
      </ul>

      <p className="mt-3">
        Nuestro objetivo es conectar personas rápidamente para aumentar las chances
        de reunir mascotas con sus dueños.
      </p>

      <Link to="/" className="btn btn-primary mt-3">
        Volver al Inicio
      </Link>
    </div>
  );
}
function HelpCard() {
  return (
    <div className="card shadow-lg border-0">
      <div className="card-body p-4">
        <div className="row">
          <HelpImage />
          <HelpText />
        </div>
      </div>
    </div>
  );
}
function HelpPage() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">
        ¿Cómo funciona PetFinder?
      </h1>
      <HelpCard />
    </div>
  );
}
export { HelpPage }