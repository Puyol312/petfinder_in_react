import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { LogupData } from "../../../types/logup";

type LogupProps = {
  onSubmit: (data: LogupData) => void;
};

export function LogupForm({ onSubmit }: LogupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginAlert, setLoginAlert] = useState({ alert: false, message: '' });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      await onSubmit({ email, password, confirmPassword, });
    } catch (error) {
      setLoginAlert({
        alert: true,
        message: String(error) || "Error iniciando sesión"
      })
    }
    form.reset();
  };

  const handleReset = () => { 
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
		<div className="col-12 col-md-5 col-lg-4">
			<div className="p-4 p-md-5 bg-white shadow rounded">
				<h3 className="mb-4 text-center text-md-start fw-bold">Crear cuenta</h3>

				{loginAlert.alert && (
					<div id="login-error" className="alert alert-danger py-2 text-center">
						{loginAlert.message}
					</div>
				)}

				<form onSubmit={handleSubmit} onReset={handleReset}>
					<div className="mb-3">
						<label className="form-label">
							<strong>Email</strong>
						</label>
						<input
							type="email"
							className="form-control"
							placeholder="example@gmail.com"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="mb-3">
						<label className="form-label">
							<strong>Contraseña</strong>
						</label>
						<input
							type="password"
							className="form-control"
							placeholder="Tu contraseña"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className="mb-3">
						<label className="form-label">
							<strong>Confirmar contraseña</strong>
						</label>
						<input
							type="password"
							className="form-control"
							placeholder="Confirmar contraseña"
							required
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>

					<button type="submit" className="btn btn-primary w-100 py-2 mb-2">
						Crear cuenta
					</button>

					<p className="mt-3 text-center small">
						¿Ya tenés una cuenta?{" "}
						<Link to="/signin" className="text-primary fw-bold">
							Iniciar sesión
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
