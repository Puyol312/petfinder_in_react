import React, { FormEvent, useState } from "react"

import { useUser } from "../../../hooks/user-hooks";

import * as css from "../config.module.css"
import { User } from "../../../types/user";

import { getControladorUsuario } from "../../../lib/User_Controler/users-controller";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type ConfigFormProp = {
  onSubmit: (nombre: string, localidad: string) => void;
  user: User | null;
}

function ConfigForm({ onSubmit, user }: ConfigFormProp) {
  const [formData, setFormData] = useState({
    nombre: user?.email?.split("@")[0] || "",
    localidad: "",
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    onSubmit(formData.nombre, formData.localidad);
    form.reset();
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 rounded shadow bg-light">
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label fw-semibold">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          className="form-control"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ingresá tu nombre"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="localidad" className="form-label fw-semibold">
          Localidad
        </label>
        <input
          id="localidad"
          name="localidad"
          type="text"
          className="form-control"
          value={formData.localidad}
          onChange={handleChange}
          placeholder="Ingresá tu localidad"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Guardar
      </button>
    </form>
  );
}

export function ConfigDataPage() {
  const [user,] = useUser();
  const navigate = useNavigate();
  const handleSubmit = async (nombre: string, localidad: string) => {
    if (!user?.token) return 
    try {
      const res = await getControladorUsuario().editarDatosUsuario(nombre, localidad, user.token);
      Swal.fire({
        icon: 'success',
        title: '¡Reporte enviado!',
        text: 'El reporte fue recibido correctamente',
        timer: 2000,
        showConfirmButton: false
      });
      navigate("/config");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: '¡Opss..!',
        text: 'Ocurrio un error al momento del cambio',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }
  return (
    <>
      <div className={css.configHeader}>
        <h1> Datos Personales </h1>
      </div>
      <div className={css.configActions}>
        <ConfigForm onSubmit={handleSubmit} user={user}/>
      </div>
    </>
  )
}