import { API_BASE_URL } from "../../../config";
import { IcrearUsuario, IverificarUsuario } from "../../../types/controler";

import { controladorUsuarioOk } from "../Ok";

// --- Log in Usuario ---
const verificarUsuario: IverificarUsuario = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const err = await res.json();
    throw err.message || "Error en login";
  }

  const data = await res.json();
  return data.token;
}
const crearUsuario: IcrearUsuario = async (email: string, password: string) => { 
    const res = await fetch(`${API_BASE_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const err = await res.json();
    throw err.message || "Error en signup";
  }

  const data = await res.json();
  return data.token;
}
export const controladorUsuario = {
  crearUsuario: crearUsuario,
  verificarUsuario: verificarUsuario,
  editarDatosUsuario: controladorUsuarioOk.editarDatosUsuario,
  editarPasswordUsuario: controladorUsuarioOk.editarPasswordUsuario
}