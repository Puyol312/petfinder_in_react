import { DtReporte, PetWanted } from "../../../types/pet";
import { Geolocation } from "../../../types/geo";

import { API_BASE_URL } from "../../../config";
import { IAltaReporteMascota, IEditarReporteMascota, IEnviarReporte, IGetMascotas, IGetMascotasCerca, IGetMiReporteById, ReporteResponse } from "../../../types/controler";


// --- Obtener Reportes ---

// PRE: Se reciben coordenadas válidas (lat, lng)
// POST: Retorna un array de mascotas cercanas o null si ocurre un error en la petición
const getMascotasCercaApi:IGetMascotasCerca = async ({ lat, lng }: Geolocation) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reportes?lat=${lat}&lng=${lng}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Error al obtener las mascotas:", response.statusText);
      return null;
    }
    const data: PetWanted[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la petición de mascotas:", error);
    return null;
  }
}
// --- Reportar Mascota cerca ---

// PRE: Se reciben parámetros válidos (name, tel, message, reportId) y API_BASE_URL definido
// POST: Envía el reporte al backend y retorna la respuesta JSON o lanza un error si falla
const enviarReporteMascota:IEnviarReporte = async (name: string, tel: string, message: string, reportId:number)=> { 
  try {
    const res = await fetch(`${API_BASE_URL}/reportes`, { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        tel,
        message,
        reportId
      }),
    });
    if (!res.ok) {
      // El servidor respondió con error (400, 500, etc)
      const errorText = await res.text();
      throw new Error(`Error al enviar reporte: ${errorText}`);
    }

    const data = await res.json(); 
    console.log("Reporte enviado correctamente:", data); // <------------------ DELETE ------------
    return data;
  } catch (err) {
    console.error("Error al enviar reporte:", err); // <------------------ DELETE ------------
    throw err;
  }
}
// --- Obtener mis reportes ---

// PRE: Se recibe un usuario válido con token y API_BASE_URL definido
// POST: Retorna las mascotas reportadas del usuario o null si ocurre un error en la petición
const getMisMascotasReportadasApi: IGetMascotas = async (token:string) => { 
  const res = await fetch(`${API_BASE_URL}/misreportes`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al obtener las mascotas (status ${res.status}): ${errorText}`);
  }

  return await res.json() as PetWanted[];
}

// --- Alta reporte mascota --- 

const altaReporteMascotaApi: IAltaReporteMascota = async (token: string, newReport:DtReporte) => {
  try {
    const formData = new FormData();
    formData.append("nombreMascota", newReport.name);
    formData.append("lat", newReport.location.lat.toString());
    formData.append("lng", newReport.location.lng.toString());
    formData.append("ciudad", newReport.city);
    formData.append("pais", newReport.country);
    formData.append("imagen", newReport.img);
    const res = await fetch(`${API_BASE_URL}/misreportes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });
    
    if (!res.ok) {
      // El servidor respondió con error (400, 500, etc)
      const errorText = await res.text();
      throw new Error(`Error al enviar reporte: ${errorText}`);
    }

    const data = await res.json(); 
    console.log("Reporte enviado correctamente:", data); // <------------------ DELETE ------------
    return data;
  } catch (err) {
    console.error("Error al enviar reporte:", err); // <------------------ DELETE ------------
    throw err;
  }
}
// --- Obtener mi reporte ---
const getMiReporteByIdApi: IGetMiReporteById = async (token: string, id: number) => { 
  const res = await fetch(`${API_BASE_URL}/misreportes/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al obtener reporte (status ${res.status}): ${errorText}`);
  }

  const data = await res.json();

  const imgBlob = await fetch(data.imgUrl).then((r) => r.blob());
  const imgFile = new File([imgBlob], "reporte.jpg", {
    type: imgBlob.type || "image/jpeg",
  });

  return {
    name: data.name,
    city: data.city,
    country: data.country,
    location: data.location,
    img: imgFile,
  };
}
// --- Editar Reporte ---
const editarReporteMascotaApi: IEditarReporteMascota = async (token: string, id: number, newReport: DtReporte) => { 
  try {
    const formData = new FormData();
    formData.append("nombreMascota", newReport.name);
    formData.append("lat", newReport.location.lat.toString());
    formData.append("lng", newReport.location.lng.toString());
    formData.append("ciudad", newReport.city);
    formData.append("pais", newReport.country);
    formData.append("imagen", newReport.img);
    const res = await fetch(`${API_BASE_URL}/misreportes/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });
    
    if (!res.ok) {
      // El servidor respondió con error (400, 500, etc)
      const errorText = await res.text();
      throw new Error(`Error al enviar reporte: ${errorText}`);
    }

    const data = await res.json(); 
    console.log("Reporte enviado correctamente:", data); // <------------------ DELETE ------------
    return data;
  } catch (err) {
    console.error("Error al enviar reporte:", err); // <------------------ DELETE ------------
    throw err;
  }
}
// --- Exportaciones ---

//Produccion 
export const controladorMascotasAPI = {
  altaReporteMascota: altaReporteMascotaApi,
  getMascotasCerca: getMascotasCercaApi,
  getMiReporteById: getMiReporteByIdApi,
  getMisMascotasReportadas: getMisMascotasReportadasApi,
  enviarReporteMascota: enviarReporteMascota,
  editarReporteMascota:editarReporteMascotaApi
};