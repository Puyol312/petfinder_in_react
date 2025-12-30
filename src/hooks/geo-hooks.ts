import { useState, useEffect } from "react";
import { atom, useAtom } from "jotai";

import { Geolocation } from "../types/geo";
import { PetWanted } from "../types/pet";

import { controladorMascotasOk as controladorMascotas } from "../lib/api/mascotas-controller";
import { useSearchParams } from "react-router-dom";

// GEO ATOMS
const geoAtom = atom<Geolocation | null>(null);

const nearReportsAtom = atom<Promise<PetWanted[] | null>>(async (get) => {
  const geo = get(geoAtom);
  if (!geo) return [];
  try {
    return await controladorMascotas.getMascotasCerca(geo);
  } catch (e) { 
    console.error(e);
    return [];
  }
});

const useGeo = () => {
  return useAtom(geoAtom);
}

const useNearReports = () => {
  const [params] = useSearchParams();
  const latParam = params.get('lat');
  const lngParam = params.get('lng');
  const lat = latParam ? Number(latParam) : null;
  const lng = lngParam ? Number(lngParam) : null;
  const [, setGlobalQuery] = useAtom(geoAtom);
  
  useEffect(() => {
    if (lat !== null && lng !== null) {
      setGlobalQuery({ lat, lng });
    }
  }, [lat, lng, setGlobalQuery]);

  return useAtom(nearReportsAtom);
}

export {
  useGeo,
  useNearReports
}