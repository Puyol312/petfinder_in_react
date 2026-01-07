import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

export function Form({ onSubmit }: { onSubmit: (email:string, password:string, remember:boolean) => Promise<void> }) {
  const [loginAlert, setLoginAlert] = useState({ alert: false, message: '' });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault(); e.stopPropagation();
    
    const form = e.currentTarget;
    const data = new FormData(form);
    const obj = Object.fromEntries(data.entries());

    const email = String(obj.email);
    const password = String(obj.password);
    const remember = obj.remember === "true";
    
    try {
      await onSubmit(email, password, remember);
    } catch (error) {
      setLoginAlert({
        alert: true,
        message: String(error) || "Error iniciando sesión"
      })
    }
    form.reset();
  }
  return (
    <div className="col-12 col-md-6 col-lg-5">
      <div className="p-4 p-md-5 bg-white shadow rounded mx-auto" style={{ maxWidth: 420 }}>
        
        <h3 className="mb-4 text-center text-md-start fw-bold">Iniciar sesión</h3>

        {loginAlert.alert && <div id="login-error" className="alert alert-danger py-2 text-center">{loginAlert.message}</div>}
        
        <form id="login-form" onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label"><strong>Email</strong></label>
            <input name="email" type="email" className="form-control" placeholder="example@gmail.com" required />
          </div>

          <div className="mb-3">
            <label className="form-label"><strong>Contraseña</strong></label>
            <input name="password" type="password" className="form-control" placeholder="Tu contraseña" required />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check m-0">
              <input className="form-check-input" type="checkbox" name="remember" value="true"/>
              <label className="form-check-label" >
                Recordarme
              </label>
            </div>
            <Link to="/help" className="text-primary small">¿Olvidaste tu contraseña?</Link>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 mb-2">Ingresar</button>

          <p className="mt-3 text-center small">
            ¿No tenés cuenta?
            <Link to="/signup" className="text-primary fw-bold">Registrate</Link>
          </p>

        </form>
      </div>
    </div>
  );
}