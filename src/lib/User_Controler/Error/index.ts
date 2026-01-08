import { API_BASE_URL } from "../../../config";
import { IcrearUsuario, IverificarUsuario, IEditarDatosUsuario, IEditarPasswordUsuario } from "../../../types/controler";
// --- Log in Usuario ---
const verificarUsuarioError: IverificarUsuario = (email: string, password: string) => {
  return new Promise<string>((_resolve, reject) => {
    setTimeout(() => {
      reject("Error al verificar usuario: Simulacro de error");
    }, 2000);
  });
}
// --- Alta Usuario ---
const crearUsuarioError: IcrearUsuario = (email: string, password: string) => { 
  return new Promise<string>((_resolve, reject) => {
    setTimeout(() => {
      reject("Error al verificar usuario: Simulacro de error");
    }, 2000);
  });
}
// --- Editar Datos del Usuario ---
const editarDatosUsuarioError: IEditarDatosUsuario = (nombre, localidad, token) => { 
  return new Promise<string>((_resolve, reject) => {
    setTimeout(() => {
      reject("Error al cambiar los datos: Simulacro de error");
    }, 2000);
  });
}
const editarPasswordUsuarioError: IEditarPasswordUsuario = (password, confirmation, token) => {
  return new Promise<string>((_resolve, reject) => {
    setTimeout(() => {
      reject("Error al cambiar la contraseña: Simulacro de error");
    }, 2000);
  });
  
} 

export const controladorUsuarioError = {
  crearUsuario: crearUsuarioError,
  verificarUsuario: verificarUsuarioError,
  editarDatosUsuario: editarDatosUsuarioError,
  editarPasswordUsuario: editarPasswordUsuarioError
}