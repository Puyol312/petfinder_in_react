import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { LogupData } from "../../../types/logup";

type LogupProps = {
  onSubmit: (data: LogupData) => void;
};

export function LogupForm({ onSubmit }: LogupProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState({ value: "", isPasswordValid: false });
	const [confirPassword, setConfirPassword] = useState({ value: "", isPasswordValid: false });
	
	const [logupAlert, setLoginAlert] = useState({ alert: false, message: '' });
	const [passwordAlert, setPasswordAlert] = useState({ alert: false, message: '' });
	const [confirPasswordAlert, setConfirPasswordAlert] = useState({ alert: false, message: '' });

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;

		if (!email || !password.isPasswordValid || !confirPassword.isPasswordValid) { 
			setLoginAlert({alert:true, message:"Email, contraseña o confirmacion invalida"})
			return 
		}
		try {
			await onSubmit({ email, password:password.value, confirmPassword:confirPassword.value, });
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
		setPassword({ value: "", isPasswordValid: false });
		setConfirPassword({ value: "", isPasswordValid: false });
		setLoginAlert({ alert: false, message: '' });
		setPasswordAlert({ alert: false, message: '' });
		setConfirPasswordAlert({ alert: false, message: '' });
	}
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// Regex: mínimo 8 caracteres y al menos 1 símbolo
		const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
		setPassword({
			value: value,
			isPasswordValid: passwordRegex.test(value),
		});
	};
	const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const isPasswordValid = value === password.value;
		setConfirPassword({ value, isPasswordValid });
	}

	useEffect(() => {
		if (!password.value) {
			setPasswordAlert({ alert: false, message: "" });
		} else {
			setPasswordAlert({
				alert: !password.isPasswordValid,
				message: password.isPasswordValid
					? ""
					: "La contraseña debe tener al menos 8 caracteres y contener un símbolo",
			});
		}

		if (!confirPassword.value) {
			setConfirPasswordAlert({ alert: false, message: "" });
		} else {
			setConfirPasswordAlert({
				alert: !confirPassword.isPasswordValid,
				message: confirPassword.isPasswordValid
					? ""
					: "La contraseña debe ser idéntica a la anterior",
			});
		}
	}, [password, confirPassword])
  return (
		<div className="col-12 col-md-6 col-lg-5">
			<div className="p-4 p-md-5 bg-white shadow rounded mx-auto" style={{ maxWidth: 420 }}>
				<h3 className="mb-4 text-center text-md-start fw-bold">Crear cuenta</h3>

				{logupAlert.alert && (
					<div id="login-error" className="alert alert-danger py-2 text-center">
						{logupAlert.message}
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
						{passwordAlert.alert && (
							<div className="alert alert-danger py-1 small text-center mt-2">
								{passwordAlert.message}
							</div>
						)}
						<input
							type="password"
							className="form-control"
							placeholder="Tu contraseña"
							required
							value={password.value}
							onChange={handlePasswordChange}
						/>
					</div>

					<div className="mb-3">
						<label className="form-label">
							<strong>Confirmar contraseña</strong>
						</label>
						{confirPasswordAlert.alert && (
							<div className="alert alert-danger py-1 small text-center mt-2">
								{confirPasswordAlert.message}
							</div>
						)}
						<input
							type="password"
							className="form-control"
							placeholder="Confirmar contraseña"
							required
							value={confirPassword.value}
							onChange={handleConfirmPasswordChange}
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
