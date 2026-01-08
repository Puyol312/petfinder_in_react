import { DtReporte, PetWanted } from "../../../types/pet";
import { Geolocation } from "../../../types/geo";

import { API_BASE_URL } from "../../../config";
import { IAltaReporteMascota, IEditarReporteMascota, IEnviarReporte, IGetMascotas, IGetMascotasCerca, IGetMiReporteById, ReporteResponse } from "../../../types/controler";

// PRE: Se reciben coordenadas válidas (lat, lng)
// POST: Retorna una lista mock de mascotas para pruebas sin realizar peticiones reales
export const getMascotasCercaTest: IGetMascotasCerca = async ({lat,lng}) => { 
  const datosMock: PetWanted[] = [
    {
      name: 'Test 1',
      img: 'https://lipsum.app/640x480/',
      street: "loremipsum1",
      city: 'loremipsum1',
      id:1
    },
    {
      name: 'Test 2',
      img: 'https://lipsum.app/640x480/',
      street: "loremipsum2",
      city: 'loremipsum2',
      id:2
    },
    {
      name: 'Test 3',
      img: 'https://lipsum.app/640x480/',
      street: "loremipsum3",
      city: 'loremipsum3',
      id:3
    },
    {
      name: 'Test 4',
      img: 'https://lipsum.app/640x480/',
      street: "loremipsum4",
      city: 'loremipsum4',
      id:4
    },
    {
      name: 'Test 5',
      img: 'https://lipsum.app/640x480/',
      street: "loremipsum5",
      city: 'loremipsum5',
      id:5
    },
  ];
  return datosMock; 
}
// PRE: Se reciben parámetros válidos (name, tel, message, reportId)
// POST: Retorna una promesa resuelta simulando una respuesta exitosa del backend tras 2 segundos
const enviarReporteMascotaOk: IEnviarReporte = async (name: string, tel: string, message: string, reportId: number) => {
  return new Promise<ReporteResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        message: "Todo salió bien.",
        reporteId: 20
      });
    }, 2000);
  });
}
// PRE: Se recibe un usuario válido (user)
// POST: Retorna una lista mock de mascotas reportadas para pruebas sin realizar peticiones reales
export const getMisMascotasReportadasTest: IGetMascotas = async (token:string) => { 
  const datosMock: PetWanted[] = [
    {
      name: 'Test 1',
      img: 'https://lipsum.app/640x480/',
      street: "loremipsum1",
      city: 'loremipsum1',
      id:1
    },
    {
      name: 'Test 2',
      img: 'https://lipsum.app/640x480/',
      street: "loremipsum2",
      city: 'loremipsum2',
      id:2
    },
    {
      name: 'Test 3',
      img: 'https://lipsum.app/640x480/',
      street: "loremipsum3",
      city: 'loremipsum3',
      id:3
    },
    {
      name: 'Test 4',
      img: 'https://lipsum.app/640x480/',
      street: "loremipsum4",
      city: 'loremipsum4',
      id:4
    },
    {
      name: 'Test 5',
      img: 'https://lipsum.app/640x480/',
      street: "loremipsum5",
      city: 'loremipsum5',
      id:5
    },
  ];
  return datosMock;
}
// --- Alta reporte mascota --- 
const altaReporteMascotaOk: IAltaReporteMascota = async (token: string, newReport:DtReporte) => {
    return new Promise<ReporteResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        message: "Todo salió bien.",
        reporteId: 20
      });
    }, 2000);
  });
}
// --- Obtener mi reporte ---
const getMiReporteByIdOk: IGetMiReporteById = async (token: string, id: number) => { 
  const imagen = new File(["contenido falso"], "mascota.jpg", { type: "image/jpeg" });
  const [latitud, longitud, nombre, ciudad, pais] = [10, -20, 'testNombre', 'testCity', 'testPais'];
  return {
    location: { lat: latitud, lng: longitud },
    name: nombre,
    city: ciudad,
    country: pais,
    img:imagen
  }
}
// --- Editar Reporte ---
const editarReporteMascotaOk: IEditarReporteMascota = async (token: string, id: number, newReport: DtReporte) => { 
  return new Promise<ReporteResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        message: "Todo salió bien.",
        reporteId: 20
      });
    }, 2000);
  });
}
export const controladorMascotasOk = {
  altaReporteMascota: altaReporteMascotaOk,
  getMascotasCerca: getMascotasCercaTest,
  getMisMascotasReportadas: getMisMascotasReportadasTest,
  getMiReporteById: getMiReporteByIdOk,
  enviarReporteMascota: enviarReporteMascotaOk,
  editarReporteMascota: editarReporteMascotaOk
}