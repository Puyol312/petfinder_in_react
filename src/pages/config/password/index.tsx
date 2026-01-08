import React, { FormEvent, useEffect, useState } from "react"

import * as css from "../config.module.css";
import { User } from "../../../types/user";
import { useUser } from "../../../hooks/user-hooks";
import { getControladorUsuario } from "../../../lib/User_Controler/users-controller";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type ConfigFormProp = {
  onSubmit: (password:string, confirmation:string) => void;
}

function ConfigForm({ onSubmit }: ConfigFormProp) {
  const [formData, setFormData] = useState({
    password: {value: "", isValid:false},
    confirmation: {value:"", isValid:false},
  });
  const [alert, setAlert] = useState({
    password: { alert: false, message: '' },
    confirmation:{ alert: false, message: '' }
  });
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Regex: mínimo 8 caracteres y al menos 1 símbolo
    const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    setFormData(prev => ({
      ...prev,
      password: {
        value,
        isValid: passwordRegex.test(value)
      }
    }))
  };
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isConfirmationValid = value === formData.password.value;
    setFormData(prev => ({
      ...prev,
      confirmation: {
        value,
        isValid: isConfirmationValid
      }
    }));
  }
  useEffect(() => {
    if (!formData.password.value) {
      setAlert(prev => ({
        ...prev,
        password: {alert:false, message:""}
      }))
    } else {
      setAlert(prev => ({
        ...prev,
        password:
        {
        alert: !formData.password.isValid,
        message: formData.password.isValid
          ? ""
          : "La contraseña debe tener al menos 8 caracteres y contener un símbolo",
      }}));
    }

    if (!formData.confirmation.value) {
      setAlert(prev => ({
        ...prev,
        confirmation: {alert:false, message:""}
      }))
    } else {
      setAlert(prev => ({
        ...prev,
        confirmation: {
          alert: !formData.confirmation.isValid,
          message: formData.confirmation.isValid
            ? ""
            : "La contraseña debe ser idéntica a la anterior",
        }
      }))
    }
  }, [formData])

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!formData.password.isValid || !formData.confirmation.isValid) return;
    onSubmit(formData.password.value, formData.confirmation.value);
    form.reset();
  };
  return (
		<form onSubmit={handleSubmit} className="p-4 rounded shadow bg-light">
			<div className="mb-3">
				<label htmlFor="contraseña" className="form-label fw-semibold">
					Contraseña
				</label>
				{alert.password.alert && (
					<div className="alert alert-danger small text-center overflow-auto max-w-full">
						{alert.password.message}
					</div>
				)}
				<input
					id="contraseña"
					name="contraseña"
					type="password"
					className="form-control"
					value={formData.password.value}
					onChange={handlePasswordChange}
					placeholder="Escribe la nueva contraseña"
					required
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="confirmacion" className="form-label fw-semibold">
					Confirmacion
				</label>
				{alert.confirmation.alert && (
					<div className="alert alert-danger small text-center overflow-auto max-w-full">
						{alert.confirmation.message}
					</div>
				)}
				<input
					id="confirmacion"
					name="confirmacion"
					type="password"
					className="form-control"
					value={formData.confirmation.value}
					onChange={handleConfirmPasswordChange}
					placeholder="Reescribe la contraseña"
					required
				/>
			</div>

			<button type="submit" className="btn btn-primary w-100">
				Guardar
			</button>
		</form>
	);
}

export function ConfigPasswordPage() {
  const [user,] = useUser();
  const navigate = useNavigate();
  const handleSubmit = async (password:string, confirmation:string, token:string) => { 
    try {
      if (!user?.token) { 
        throw new Error("Token faltante");
        return
      } 
      const res = await getControladorUsuario().editarPasswordUsuario(password, confirmation, user.token);
      Swal.fire({
        icon: 'success',
        title: '¡Reporte enviado!',
        text: 'El cambio fue hecho correctamente',
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
        <ConfigForm onSubmit={() => { }} />
      </div>
    </>
  )
}