import { CONTROLER_MODE } from "../../config";
import { ControlerRole } from "../../types/controler";

import { controladorUsuario } from "./API";
import { controladorUsuarioOk } from "./Ok";
import { controladorUsuarioError } from "./Error";

function getControladorUsuario() {
  const mode = CONTROLER_MODE.getInstance().getMode();

  switch (mode) {
    case ControlerRole.OK:
      return controladorUsuarioOk;

    case ControlerRole.ERROR:
      return controladorUsuarioError;

    case ControlerRole.API:
    default:
      return controladorUsuario;
  }
}

export { getControladorUsuario };