import { DtReporte, PetWanted } from "./pet";
import { Geolocation } from "./geo";

export enum ControlerRole {
  OK,
  ERROR,
  API
}
export const modes = ["OK", "ERROR", "API"]
export type ReporteResponse = { message: string; reporteId: number; };
export type IEnviarReporte = (name: string, tel: string, message: string, reportId: number) => Promise<ReporteResponse>;
export type IAltaReporteMascota = (token: string, newReport:DtReporte) => Promise<ReporteResponse>;
export type IEditarReporteMascota = (token: string, id:number, newReport:DtReporte) => Promise<ReporteResponse>;
export type IGetMiReporteById = (token: string, id: number) => Promise<DtReporte>;
export type IGetMascotas = (token:string) => Promise<PetWanted[] | null>;
export type IGetMascotasCerca = ({ lat, lng }: Geolocation) => Promise<PetWanted[] | null>;
export type IverificarUsuario = (email: string, password: string) => Promise<string>;
export type IcrearUsuario = (email: string, password: string) => Promise<string>;
export type IEditarDatosUsuario = (nombre: string, localidad: string, token: string) => Promise<string>
export type IEditarPasswordUsuario = (password: string, confirmation: string, token: string) => Promise<string>
