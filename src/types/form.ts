import { Geolocation } from "./geo";

export type FormDataParsed = {
  nombre: string;
  imagen: File;
  ciudad: string;
  pais: string;
  ubicacion: Geolocation;
  token: string;
};