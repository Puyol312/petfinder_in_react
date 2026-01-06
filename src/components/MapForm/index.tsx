import React ,{ FormEvent, useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Geolocation } from "../../types/geo";
import { FormDataParsed } from "../../types/form";

import * as css from "./mapform.module.css";
import Swal from "sweetalert2";

type ReportarMascotaFormProps = {
  ubicacion: Geolocation;
  token: string;
  onSubmit: (data: FormDataParsed) => void;
  onReset: () => void;
  inyec?: FormDataParsed; 
}

export function MapForm({ ubicacion, token, onSubmit, onReset, inyec }: ReportarMascotaFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState("Ninguna imagen seleccionada");
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState<string>("");

  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const file = fileInputRef.current?.files?.[0] ?? inyec?.imagen;
    if (!file) {
      Swal.fire({
        icon: 'error',
        title: `¡Se requiere una imagen!`,
        text: `Para subir un reporte requiere una imagen de la mascota perdida.`,
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }
    if (!formData.get("ubicacion")) { 
      Swal.fire({
        icon: 'error',
        title: `¡Se requiere una ubicación!`,
        text: `Para subir un reporte requiere una ubicación aprox. de la mascota perdida.`,
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }
    const ubicacion = formData.get("ubicacion")?.toString() ?? "";
    const [latitud, longitud] = ubicacion.split(",").map(Number)
    onSubmit({
      nombre: formData.get("nombre") as string,
      imagen: file,
      ciudad: formData.get("ciudad") as string,
      pais: formData.get("pais") as string,
      ubicacion: {lat:latitud, lng:longitud},
      token,
    });
    form.reset();
  };
  const handleReset = () => {
    // limpiar estados
    setImagePreview(null);
    setImageName("Ninguna imagen seleccionada")
    setUbicacionSeleccionada("");
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
  }
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageName(file.name);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageName("Ninguna imagen seleccionada");
      setImagePreview(null);
    }
  };
  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = L.map("map").setView(
      [ubicacion.lat!, ubicacion.lng!],
      13
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapRef.current);

    const defaultIcon = L.icon({
      iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    mapRef.current.on("click", (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      setUbicacionSeleccionada(`${lat},${lng}`);

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], {
          icon: defaultIcon,
        }).addTo(mapRef.current!);
      }
    });
  }, []);
  useEffect(() => {
    if (!inyec?.imagen) return;

    const objectUrl = URL.createObjectURL(inyec.imagen);

    setImagePreview(objectUrl);
    setImageName(inyec.imagen.name);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [inyec?.imagen]);
  useEffect(() => {
    if (!inyec || !mapRef.current) return;

    const { lat, lng } = inyec.ubicacion;

    setUbicacionSeleccionada(`${lat},${lng}`);

    mapRef.current.setView([lat, lng], 13);

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
    }
  }, [inyec?.ubicacion]);
  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className={`card shadow-lg p-4 ${css.custom_card}`}>
        <form id="reportarMascota" onSubmit={handleSubmit} onReset={handleReset}>
          <h4 className="mb-4 text-center fw-bold text-primary">
            Reportar Mascota
          </h4>

          {/* Nombre */}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre de la mascota
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-control"
              required
              placeholder="Ej: Firulais"
              defaultValue={inyec?.nombre}
            />
          </div>

          {/* Imagen */}
          <div className="mb-3 text-center">
            <label className="form-label d-block">Foto de la mascota</label>

            <input
              type="file"
              id="imagen"
              name="imagen"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={onImageChange}
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Vista previa"
                className="img-thumbnail mb-2"
                style={{ maxWidth: 200 }}
              />
            )}

            <div className="d-flex flex-column align-items-center">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mb-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <i className="bi bi-camera me-1"></i> Agregar foto
              </button>

              <span className="text-muted small">{imageName}</span>
            </div>
          </div>

          {/* Mapa (solo contenedor) */}
          <div className="mb-3">
            <label className="form-label">Ubicación</label>
              <div
                id="map"
                className="border rounded"
                style={{ height: 250, position: "relative"}}
              ></div>
            <p className="form-text mt-2 text-muted text-center">
              Haz clic en el mapa para seleccionar la ubicación
            </p>
          </div>

          {/* Ciudad / País */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="ciudad" className="form-label">
                Ciudad
              </label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                className="form-control"
                required
                placeholder="Ej: Montevideo"
                defaultValue={inyec?.ciudad}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="pais" className="form-label">
                País
              </label>
              <input
                type="text"
                id="pais"
                name="pais"
                className="form-control"
                required
                placeholder="Ej: Uruguay"
                defaultValue={inyec?.pais}
                />
            </div>
          </div>

          {/* Hidden */}
          <input type="hidden" name="ubicacion" value={ubicacionSeleccionada} />
          <input type="hidden" name="token" value={token} />

          {/* Botones */}
          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-primary px-4">
              Enviar
            </button>
            <button type="reset" onClick={onReset} className="btn btn-outline-secondary px-4">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { FormDataParsed };
