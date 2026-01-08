import { API_BASE_URL } from "../../../config";
import {
  IcrearUsuario,
  IverificarUsuario,
  IEditarDatosUsuario,
  IEditarPasswordUsuario
} from "../../../types/controler";

// --- Log in Usuario ---
const verificarUsuarioOk: IverificarUsuario = (email: string, password: string) => { 
  return new Promise<string>(resolve => {
    setTimeout(() => {
      resolve('tokenfalso');
    }, 2000)
  });
} 

// --- Alta Usuario ---
const crearUsuarioOk: IcrearUsuario = (email: string, password: string) => { 
  return new Promise<string>(resolve => {
    setTimeout(() => {
      resolve('tokenfalso');
    }, 2000)
  });
}
// --- Editar datos ---
const editarDatosUsuarioOk: IEditarDatosUsuario = (nombre, localidad, token) => { 
  return new Promise<string>(resolve => {
    setTimeout(() => {
      resolve('Todo salio bien');
    }, 2000)
  });
} 
const editarPasswordUsuarioOk: IEditarPasswordUsuario = (password, confirmation, token) => { 
  return new Promise<string>(resolve => {
    setTimeout(() => {
      resolve('Todo salio bien');
    }, 2000)
  });
}

export const controladorUsuarioOk = {
  crearUsuario: crearUsuarioOk,
  verificarUsuario: verificarUsuarioOk,
  editarDatosUsuario: editarDatosUsuarioOk,
  editarPasswordUsuario: editarPasswordUsuarioOk
}