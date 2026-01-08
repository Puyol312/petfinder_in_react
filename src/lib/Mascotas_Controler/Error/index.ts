import { DtReporte, PetWanted } from "../../../types/pet";
import { Geolocation } from "../../../types/geo";

import { API_BASE_URL } from "../../../config";
import { IAltaReporteMascota, IEditarReporteMascota, IEnviarReporte, IGetMascotas, IGetMascotasCerca, IGetMiReporteById, ReporteResponse } from "../../../types/controler";
import { getMascotasCercaTest, getMisMascotasReportadasTest } from "../Ok";

// PRE: Se reciben parámetros válidos (name, tel, message, reportId)
// POST: Lanza un error simulado para probar el manejo de fallos en el envío de reportes
const enviarReporteMascotaError: IEnviarReporte = async (name: string, tel: string, message: string, reportId: number) => {
  throw new Error(`Error al enviar reporte: Simulacro de error`);
}
// --- Alta reporte mascota ---
const altaReporteMascotaError: IAltaReporteMascota = async (token: string, newReport:DtReporte) => {
  throw new Error(`Error al enviar reporte: Simulacro de error`);
}
// --- Obtener mi reporte ---
const getMiReporteByIdError: IGetMiReporteById = async (token: string, id: number) => { 
  throw new Error(`Error al obtener reporte simulacro (status 404)`);
}
// --- Editar Reporte ---
const editarReporteMascotaError: IEditarReporteMascota = async (token: string, id: number, newReport: DtReporte) => { 
  throw new Error(`Error al enviar reporte: Simulacro de Error`);
}
export const controladorMascotasError = {
  altaReporteMascota: altaReporteMascotaError,
  getMascotasCerca: getMascotasCercaTest,
  getMisMascotasReportadas: getMisMascotasReportadasTest,
  getMiReporteById: getMiReporteByIdError,
  enviarReporteMascota: enviarReporteMascotaError,
  editarReporteMascota: editarReporteMascotaError
}