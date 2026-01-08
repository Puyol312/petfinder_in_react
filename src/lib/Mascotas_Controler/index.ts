import { CONTROLER_MODE } from "../../config";
import { ControlerRole } from "../../types/controler";

import { controladorMascotasOk } from "./Ok";
import { controladorMascotasAPI } from "./APi/index.";
import { controladorMascotasError } from "./Error";

function getControladorMascotas() {
  const mode = CONTROLER_MODE.getInstance().getMode();

  switch (mode) {
    case ControlerRole.OK:
      return controladorMascotasOk;

    case ControlerRole.ERROR:
      return controladorMascotasError;

    case ControlerRole.API:
    default:
      return controladorMascotasAPI;
  }
}

export { getControladorMascotas };